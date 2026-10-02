import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiResponseDto, DataResponseDto } from "../../../dtos/api";

@Exclude()
class HealthCheckServiceResultDto {
    @Expose()
    @ApiProperty({ enum: ["UP", "DOWN"] })
    status!: "UP" | "DOWN";

    @Expose()
    @ApiProperty({ required: false })
    message?: string;
}

@Exclude()
class HealthCheckDataDto {
    @Expose()
    @Type(() => HealthCheckServiceResultDto)
    @ApiProperty({ type: HealthCheckServiceResultDto })
    sqlite!: HealthCheckServiceResultDto;
}

@ApiSchema({
    name: "HealthCheckGetResponseDto",
})
@Exclude()
export class ResponseDto extends ApiResponseDto implements DataResponseDto {
    @Expose()
    @Type(() => HealthCheckDataDto)
    @ApiProperty({ type: HealthCheckDataDto })
    data!: HealthCheckDataDto;
}

export interface IApiInterface {
    response: InstanceType<typeof ResponseDto>;
}
