import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
    Controller,
    Get,
    HttpStatus,
    Res,
    VERSION_NEUTRAL,
    Version,
} from "@nestjs/common";
import type { FastifyReply } from "fastify";
import * as PackageJson from "../package.json";

@Controller()
export class AppController {
    @Version(VERSION_NEUTRAL)
    @Get()
    root(@Res() reply: FastifyReply) {
        const indexFile = path.join(
            path.resolve(
                process.cwd(),
                process.env.FRONTEND_DIST || "../../frontend/web/dist",
            ),
            "index.html",
        );

        if (process.env.APP_ENV === "production" && existsSync(indexFile)) {
            reply
                .status(HttpStatus.OK)
                .type("text/html")
                .send(readFileSync(indexFile));
            return;
        }

        reply.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            message: "Expense Sharing API is running",
            data: {
                version: PackageJson.version || "undefined",
            },
        });
    }
}
