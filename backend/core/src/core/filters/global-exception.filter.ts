import {
    type ArgumentsHost,
    Catch,
    type ExceptionFilter,
    type HttpException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { HttpAdapterHost } from "@nestjs/core";
import type { IAppConfig } from "~modules/shared/config/config.type";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly configService: ConfigService,
    ) {}

    getMessage(exception: HttpException) {
        const response = exception.getResponse
            ? (exception.getResponse() as {
                  message?: string | string[];
              })
            : undefined;

        if (Array.isArray(response?.message)) {
            return response.message[0];
        }
        if (response?.message) {
            return response.message;
        }
        if (exception.message) {
            return exception.message;
        }
        return "Something went wrong";
    }

    catch(exception: HttpException, host: ArgumentsHost): void {
        const app = this.configService.get("app") as IAppConfig | undefined;
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const statusCode = exception.getStatus ? exception.getStatus() : 500;

        httpAdapter.reply(
            ctx.getResponse(),
            {
                statusCode,
                message: this.getMessage(exception),
                ...(app?.env === "development"
                    ? { exception: exception.message, stack: exception.stack }
                    : {}),
            },
            statusCode,
        );
    }
}
