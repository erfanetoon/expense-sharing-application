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
        reply.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            message: "Expense Sharing API is running",
            data: {
                version: PackageJson.version || "undefined",
            },
        });
    }
}
