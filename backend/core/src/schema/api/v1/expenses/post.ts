import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { createZodDto } from "nestjs-zod";
import { ApiResponseDto, DataResponseDto } from "../../../dtos/api";
import { bodyValidation } from "./post.validation";

@Exclude()
export class ExpenseUserDto {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    name!: string;
}

@Exclude()
export class ExpenseDto {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty({ description: "Amount in cents" })
    amount!: number;

    @Expose()
    @ApiProperty()
    description!: string;

    @Expose()
    @ApiProperty()
    occurredAt!: string;

    @Expose()
    @Type(() => ExpenseUserDto)
    @ApiProperty({ type: ExpenseUserDto })
    payer!: ExpenseUserDto;

    @Expose()
    @Type(() => ExpenseUserDto)
    @ApiProperty({ type: ExpenseUserDto })
    payee!: ExpenseUserDto;
}

@ApiSchema({
    name: "CreateExpenseDto",
})
export class BodyDto extends createZodDto(bodyValidation) {}

@ApiSchema({
    name: "CreateExpenseResponseDto",
})
@Exclude()
export class ResponseDto extends ApiResponseDto implements DataResponseDto {
    @Expose()
    @Type(() => ExpenseDto)
    @ApiProperty({ type: ExpenseDto })
    data!: ExpenseDto;
}

export interface IApiInterface {
    body: InstanceType<typeof BodyDto>;
    response: InstanceType<typeof ResponseDto>;
}
