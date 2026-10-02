import type {
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

type LocalQueryOptions<Response> = Omit<
    UseQueryOptions<Response>,
    "queryKey" | "queryFn"
>;

type LocalMutationOptions<
    Response,
    TError = Error,
    TVariable = void,
    TContext = unknown,
> = Omit<
    UseMutationOptions<Response, TError, TVariable, TContext>,
    "mutationKey" | "mutationFn"
>;

type GenericObject = {
    response: unknown;
    body?: unknown;
    queries?: unknown;
    params?: unknown;
    additionalProps?: unknown;
    error?: Error;
    variables?: object | undefined;
    context?: unknown;
};

type ApiProps<T extends GenericObject, Model> = {
    axios?: AxiosRequestConfig;
    options?: Model extends "query"
        ? LocalQueryOptions<AxiosResponse<T["response"]>>
        : LocalMutationOptions<
              AxiosResponse<T["response"]>,
              T["error"],
              T["variables"] extends object ? T["variables"] : void,
              T["context"]
          >;
} & (T["body"] extends object ? { body: T["body"] } : object) &
    (T["params"] extends object ? { params: T["params"] } : object) &
    (T["queries"] extends object ? { queries: T["queries"] } : object) &
    (T["additionalProps"] extends object ? T["additionalProps"] : object);

export type TQueryHook<T extends GenericObject> = (
    _: ApiProps<T, "query">,
) => UseQueryResult<AxiosResponse<T["response"]>, Error>;

export type TMutationHook<T extends GenericObject> = (
    _: ApiProps<T, "mutation">,
) => UseMutationResult<
    AxiosResponse<T["response"]>,
    T["error"],
    T["variables"] extends object ? T["variables"] : void,
    T["context"]
>;
