import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";
import * as listExpensesApi from "~schema/api/v1/expenses/get";
import * as createExpenseApi from "~schema/api/v1/expenses/post";
import { responseSerializer } from "~utils/response-serializer";
import { ExpenseService } from "./expense.service";

@Controller("expenses")
@ApiTags("Expenses")
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Get()
    @ApiOkResponse({ type: listExpensesApi.ResponseDto })
    async list(@Res() reply: FastifyReply) {
        const data = await this.expenseService.list();
        const response = responseSerializer(listExpensesApi.ResponseDto, {
            statusCode: HttpStatus.OK,
            data,
        });
        reply.status(HttpStatus.OK).send(response);
    }

    @Post()
    @ApiCreatedResponse({ type: createExpenseApi.ResponseDto })
    async create(
        @Body() body: createExpenseApi.BodyDto,
        @Res() reply: FastifyReply,
    ) {
        const data = await this.expenseService.create(body);
        const response = responseSerializer(createExpenseApi.ResponseDto, {
            statusCode: HttpStatus.CREATED,
            message: "Expense added",
            data,
        });
        reply.status(HttpStatus.CREATED).send(response);
    }
}
