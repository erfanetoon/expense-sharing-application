import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ZodValidationException } from "nestjs-zod";

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: ZodValidationException, host: ArgumentsHost): void {
        const response = exception.getResponse() as {
            errors?: { message?: string }[];
        };
        const message =
            response?.errors?.find((error) => error.message)?.message ??
            "Invalid request";
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        httpAdapter.reply(
            ctx.getResponse(),
            {
                statusCode: 400,
                message,
            },
            400,
        );
    }
}
