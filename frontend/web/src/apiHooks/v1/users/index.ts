import { useQuery } from "@tanstack/react-query";
import endpoints from "~services/request/endpoints";
import HTTPRequest from "~services/request/httpRequest";
import type { ApiResponse, User } from "../../models";
import type { TQueryHook } from "../../types";

const usersApis = (httpRequest: HTTPRequest<keyof typeof endpoints>) => ({
    /**
     * @method useQuery
     */
    useGet: (({ options, axios }) =>
        useQuery({
            queryKey: ["usersGet"],
            queryFn: () =>
                httpRequest.get<ApiResponse<User[]>>("V1_USERS", axios),
            ...options,
        })) as TQueryHook<{ response: ApiResponse<User[]> }>,
});

export default usersApis;
