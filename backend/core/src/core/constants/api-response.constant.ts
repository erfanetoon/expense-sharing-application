import { ApiResponseOptions } from "@nestjs/swagger";

export const badRequestResponse: ApiResponseOptions = {
    status: 400,
    description: "Bad Request",
};

export const unauthorizeResponse: ApiResponseOptions = {
    status: 401,
    description: "Unauthorize",
};

export const forbiddenResponse: ApiResponseOptions = {
    status: 403,
    description: "Forbidden",
};

export const notFoundResponse: ApiResponseOptions = {
    status: 404,
    description: "Not Found",
};

export const conflictResponse: ApiResponseOptions = {
    status: 409,
    description: "Conflict",
};

export const serverErrorResponse: ApiResponseOptions = {
    status: 500,
    description: "Internal Server Error",
};
