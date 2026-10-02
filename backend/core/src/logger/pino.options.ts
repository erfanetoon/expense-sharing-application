import type { ConfigService } from "@nestjs/config";
import type { Params } from "nestjs-pino";
import pino from "pino";

export const createPinoParams = (configService: ConfigService): Params => {
    const app = configService.get("app") as { env?: string } | undefined;
    const env = app?.env ?? process.env.APP_ENV ?? "development";
    const isProduction = env === "production";
    const level = (process.env.LOG_LEVEL ??
        (isProduction ? "info" : "debug")) as pino.Level;

    return {
        pinoHttp: {
            level,
            autoLogging: false,
            transport: isProduction
                ? undefined
                : {
                      target: "pino-pretty",
                      options: { singleLine: true },
                  },
        },
    };
};
