import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";
import * as balancesApi from "~schema/api/v1/balances/get";
import { responseSerializer } from "~utils/response-serializer";
import { BalanceService } from "./balance.service";

@Controller("balances")
@ApiTags("Balances")
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Get()
    @ApiOkResponse({ type: balancesApi.ResponseDto })
    async list(@Res() reply: FastifyReply) {
        const data = await this.balanceService.list();
        const response = responseSerializer(balancesApi.ResponseDto, {
            statusCode: HttpStatus.OK,
            data,
        });
        reply.status(HttpStatus.OK).send(response);
    }
}
