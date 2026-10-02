import { useMutation, useQuery } from "@tanstack/react-query";
import endpoints from "~services/request/endpoints";
import HTTPRequest from "~services/request/httpRequest";
import type { ApiResponse, CreateExpenseBody, Expense } from "../../models";
import type { TMutationHook, TQueryHook } from "../../types";

const expensesApis = (httpRequest: HTTPRequest<keyof typeof endpoints>) => ({
    /**
     * @method useQuery
     */
    useGet: (({ options, axios }) =>
        useQuery({
            queryKey: ["expensesGet"],
            queryFn: () =>
                httpRequest.get<ApiResponse<Expense[]>>("V1_EXPENSES", axios),
            ...options,
        })) as TQueryHook<{ response: ApiResponse<Expense[]> }>,
    /**
     * @method useMutation
     */
    usePost: (({ options, axios }) =>
        useMutation({
            mutationKey: ["expensesPost"],
            mutationFn: (body) =>
                httpRequest.post<ApiResponse<Expense>, CreateExpenseBody>(
                    "V1_EXPENSES",
                    body,
                    axios,
                ),
            ...options,
        })) as TMutationHook<{
        response: ApiResponse<Expense>;
        variables: CreateExpenseBody;
    }>,
});

export default expensesApis;
