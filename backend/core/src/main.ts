import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import fastifyStatic from "@fastify/static";
import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { ZodValidationPipe } from "nestjs-zod";
import { GlobalExceptionFilter } from "~core/filters/global-exception.filter";
import { ZodExceptionFilter } from "~core/filters/zod-exception.filter";
import { configGenerator, documentGenerator } from "~core/swaggers/swagger";
import type { IAppConfig } from "~modules/shared/config/config.type";
import * as packageJson from "~root/package.json";
import { AppModule } from "./app.module";

async function bootstrap() {
    const adapter = new FastifyAdapter({
        logger: false,
        genReqId: () => randomUUID(),
    });

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        adapter,
        { bufferLogs: true },
    );
    app.useLogger(app.get(Logger));
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    const configService = app.get(ConfigService);
    const httpAdapterHost = app.get(HttpAdapterHost);
    const appConfig = configService.get("app") as IAppConfig;
    const allowedHosts = appConfig.allowedHosts;

    app.enableCors({
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["content-type", "accept"],
        origin: allowedHosts.length > 0 ? allowedHosts : true,
    });

    app.useGlobalPipes(new ZodValidationPipe());
    app.useGlobalFilters(
        new GlobalExceptionFilter(httpAdapterHost, configService),
        new ZodExceptionFilter(httpAdapterHost),
    );

    const swaggerConfig = configGenerator(packageJson?.version);
    const swaggerDocument = documentGenerator({
        app,
        config: swaggerConfig,
    });
    SwaggerModule.setup("swagger", app, swaggerDocument);

    if (appConfig.env === "production") {
        const frontendDist = path.resolve(
            process.cwd(),
            appConfig.frontendDist || "../../frontend/web/dist",
        );
        if (existsSync(frontendDist)) {
            await app.register(fastifyStatic, {
                root: frontendDist,
            });
            const fastify = app.getHttpAdapter().getInstance();
            fastify.setNotFoundHandler((request, reply) => {
                const url = request.url ?? "";
                if (url.startsWith("/v1") || url.startsWith("/swagger")) {
                    reply.status(404).send({
                        statusCode: 404,
                        message: "Not found",
                    });
                    return;
                }
                reply.sendFile("index.html");
            });
        }
    }

    await app.listen(appConfig.port, "0.0.0.0");
}

bootstrap();
