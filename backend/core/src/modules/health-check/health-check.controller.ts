import { EntityManager } from "@mikro-orm/core";
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";
import * as healthCheckApi from "~schema/api/v1/healthCheck/get";
import { responseSerializer } from "~utils/response-serializer";

@Controller("health-check")
@ApiTags("Health check")
export class HealthCheckController {
    constructor(private readonly em: EntityManager) {}

    @Get()
    @ApiOkResponse({ type: healthCheckApi.ResponseDto })
    async healthCheck(@Res() reply: FastifyReply) {
        let sqlite: { status: "UP" | "DOWN"; message?: string } = {
            status: "UP",
        };

        try {
            await this.em.getConnection().execute("select 1");
        } catch (error) {
            sqlite = {
                status: "DOWN",
                message:
                    error instanceof Error
                        ? error.message
                        : "Database is unavailable",
            };
        }

        const response = responseSerializer(healthCheckApi.ResponseDto, {
            statusCode: HttpStatus.OK,
            data: { sqlite },
        });
        reply.status(HttpStatus.OK).send(response);
    }
}
