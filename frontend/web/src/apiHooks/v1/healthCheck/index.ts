import { useQuery } from "@tanstack/react-query";
import endpoints from "~services/request/endpoints";
import HTTPRequest from "~services/request/httpRequest";
import type { ApiResponse, HealthCheckData } from "../../models";
import type { TQueryHook } from "../../types";

const healthCheckApis = (httpRequest: HTTPRequest<keyof typeof endpoints>) => ({
    /**
     * @method useQuery
     */
    useGet: (({ options, axios }) =>
        useQuery({
            queryKey: ["healthCheckGet"],
            queryFn: () =>
                httpRequest.get<ApiResponse<HealthCheckData>>(
                    "V1_HEALTH_CHECK",
                    axios,
                ),
            ...options,
        })) as TQueryHook<{ response: ApiResponse<HealthCheckData> }>,
});

export default healthCheckApis;
