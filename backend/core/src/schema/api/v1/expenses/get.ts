import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiResponseDto, DataResponseDto } from "../../../dtos/api";
import { ExpenseDto } from "./post";

@ApiSchema({
    name: "ExpensesGetResponseDto",
})
@Exclude()
export class ResponseDto extends ApiResponseDto implements DataResponseDto {
    @Expose()
    @Type(() => ExpenseDto)
    @ApiProperty({ type: [ExpenseDto] })
    data!: ExpenseDto[];
}

export interface IApiInterface {
    response: InstanceType<typeof ResponseDto>;
}
