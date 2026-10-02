import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiResponseDto, DataResponseDto } from "../../../dtos/api";

@Exclude()
export class BalanceUserDto {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    name!: string;
}

@Exclude()
export class BalanceDto {
    @Expose()
    @ApiProperty({ description: "Net amount in cents" })
    amount!: number;

    @Expose()
    @Type(() => BalanceUserDto)
    @ApiProperty({ type: BalanceUserDto })
    debtor!: BalanceUserDto;

    @Expose()
    @Type(() => BalanceUserDto)
    @ApiProperty({ type: BalanceUserDto })
    creditor!: BalanceUserDto;
}

@ApiSchema({
    name: "BalancesGetResponseDto",
})
@Exclude()
export class ResponseDto extends ApiResponseDto implements DataResponseDto {
    @Expose()
    @Type(() => BalanceDto)
    @ApiProperty({ type: [BalanceDto] })
    data!: BalanceDto[];
}

export interface IApiInterface {
    response: InstanceType<typeof ResponseDto>;
}
