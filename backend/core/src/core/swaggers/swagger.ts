import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configGenerator = (version: string) =>
    new DocumentBuilder()
        .setTitle("Expense Sharing")
        .setDescription(
            "Record expenses between people and read the net balances.",
        )
        .setVersion(version || "undefined")
        .addTag("Users")
        .addTag("Expenses")
        .addTag("Balances")
        .addTag("Health check")
        .build();

export const documentGenerator = ({
    app,
    config,
}: {
    app: NestFastifyApplication;
    config: ReturnType<typeof configGenerator>;
}) => SwaggerModule.createDocument(app, config);
