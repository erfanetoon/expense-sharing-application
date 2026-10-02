import {
    ClassConstructor,
    ClassTransformOptions,
    plainToInstance,
} from "class-transformer";

export function responseSerializer<T>(
    dto: ClassConstructor<T>,
    value: T,
    options?: ClassTransformOptions,
): T {
    return plainToInstance(dto, value, {
        excludeExtraneousValues: true,
        ...options,
    });
}
