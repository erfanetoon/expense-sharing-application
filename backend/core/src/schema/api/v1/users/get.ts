import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiResponseDto, DataResponseDto } from "../../../dtos/api";

@Exclude()
export class UserDto {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    name!: string;
}

@ApiSchema({
    name: "UsersGetResponseDto",
})
@Exclude()
export class ResponseDto extends ApiResponseDto implements DataResponseDto {
    @Expose()
    @Type(() => UserDto)
    @ApiProperty({ type: [UserDto] })
    data!: UserDto[];
}

export interface IApiInterface {
    response: InstanceType<typeof ResponseDto>;
}
