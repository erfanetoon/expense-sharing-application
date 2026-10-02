import { useQuery } from "@tanstack/react-query";
import endpoints from "~services/request/endpoints";
import HTTPRequest from "~services/request/httpRequest";
import type { ApiResponse, Balance } from "../../models";
import type { TQueryHook } from "../../types";

const balancesApis = (httpRequest: HTTPRequest<keyof typeof endpoints>) => ({
    /**
     * @method useQuery
     */
    useGet: (({ options, axios }) =>
        useQuery({
            queryKey: ["balancesGet"],
            queryFn: () =>
                httpRequest.get<ApiResponse<Balance[]>>("V1_BALANCES", axios),
            ...options,
        })) as TQueryHook<{ response: ApiResponse<Balance[]> }>,
});

export default balancesApis;
