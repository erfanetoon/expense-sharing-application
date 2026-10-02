import endpoints from "~services/request/endpoints";
import HTTPRequest from "~services/request/httpRequest";
import v1BalancesApis from "./v1/balances";
import v1ExpensesApis from "./v1/expenses";
import v1HealthCheckApis from "./v1/healthCheck";
import v1UsersApis from "./v1/users";

const apis = (httpRequest: HTTPRequest<keyof typeof endpoints>) => ({
    "v1.balances": v1BalancesApis(httpRequest),
    "v1.expenses": v1ExpensesApis(httpRequest),
    "v1.healthCheck": v1HealthCheckApis(httpRequest),
    "v1.users": v1UsersApis(httpRequest),
});

export default apis;
