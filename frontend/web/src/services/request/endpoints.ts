import type { IEndpoint } from "./types";

const endpoints = {
    V1_BALANCES: {
        methods: ["GET"],
        url: "/v1/balances",
    } as IEndpoint,
    V1_EXPENSES: {
        methods: ["GET", "POST"],
        url: "/v1/expenses",
    } as IEndpoint,
    V1_HEALTH_CHECK: {
        methods: ["GET"],
        url: "/v1/health-check",
    } as IEndpoint,
    V1_USERS: {
        methods: ["GET"],
        url: "/v1/users",
    } as IEndpoint,
};

export default endpoints;
