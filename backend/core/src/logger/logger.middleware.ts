import { Injectable, NestMiddleware } from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import { PinoLogger } from "nestjs-pino";
import { ELogNames } from "./log.enums";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: PinoLogger) {
        this.logger.setContext(LoggerMiddleware.name);
    }

    use(req: FastifyRequest["raw"], _res: unknown, next: () => void) {
        this.logger.info(
            {
                logName: ELogNames.Incoming,
                payload: {
                    method: req.method,
                    url: req.url,
                },
            },
            "incoming request",
        );
        next();
    }
}
