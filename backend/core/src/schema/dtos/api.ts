import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ApiResponseDto {
    @Expose()
    @ApiProperty()
    statusCode!: number;

    @Expose()
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true,
    })
    message?: string | null;

    @Expose()
    @ApiProperty({ required: false, nullable: true })
    exception?: unknown | null;
}

@Exclude()
export class DataResponseDto {
    @Expose()
    @ApiProperty()
    data!: unknown;
}
