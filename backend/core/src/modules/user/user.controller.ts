import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";
import * as usersApi from "~schema/api/v1/users/get";
import { responseSerializer } from "~utils/response-serializer";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOkResponse({ type: usersApi.ResponseDto })
    async list(@Res() reply: FastifyReply) {
        const data = await this.userService.list();
        const response = responseSerializer(usersApi.ResponseDto, {
            statusCode: HttpStatus.OK,
            data,
        });
        reply.status(HttpStatus.OK).send(response);
    }
}
