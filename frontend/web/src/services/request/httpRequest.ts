import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IEndpoint, TEndpoints, TUrl } from "./types";

class HTTPRequest<IEndpointKeys extends string | number | symbol> {
    private client: {
        instance: AxiosInstance;
        endpoints: TEndpoints<IEndpointKeys>;
    };

    constructor(client: {
        instance: AxiosInstance;
        endpoints: TEndpoints<IEndpointKeys>;
    }) {
        this.client = client;
    }

    async get<TResponse>(
        url: TUrl<IEndpointKeys>,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TResponse>> {
        return new Promise((resolve, reject) => {
            const route: IEndpoint =
                this.client.endpoints[typeof url === "object" ? url.base : url];

            let callUrl: string = route.url;

            if (typeof url === "object") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`:${key}`, value || "");
                    return null;
                });
            }

            if (!route.methods.includes("GET")) {
                reject("This url don't have access to 'GET' method");
                return null;
            }

            this.client.instance
                .get(callUrl, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async post<TResponse, TBody>(
        url: TUrl<IEndpointKeys>,
        body: TBody,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TResponse>> {
        return new Promise((resolve, reject) => {
            const route: IEndpoint =
                this.client.endpoints[typeof url === "object" ? url.base : url];

            let callUrl: string = route.url;

            if (typeof url === "object") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`:${key}`, value || "");
                    return null;
                });
            }

            if (!route.methods.includes("POST")) {
                reject("This url don't have access to 'POST' method");
                return null;
            }

            this.client.instance
                .post(callUrl, body, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async put<TResponse, TBody>(
        url: TUrl<IEndpointKeys>,
        body: TBody,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TResponse>> {
        return new Promise((resolve, reject) => {
            const route: IEndpoint =
                this.client.endpoints[typeof url === "object" ? url.base : url];

            let callUrl: string = route.url;

            if (typeof url === "object") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`:${key}`, value || "");
                    return null;
                });
            }

            if (!route.methods.includes("PUT")) {
                reject("This url don't have access to 'PUT' method");
                return null;
            }

            this.client.instance
                .put(callUrl, body, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async patch<TResponse, TBody>(
        url: TUrl<IEndpointKeys>,
        body: TBody,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TResponse>> {
        return new Promise((resolve, reject) => {
            const route: IEndpoint =
                this.client.endpoints[typeof url === "object" ? url.base : url];

            let callUrl: string = route.url;

            if (typeof url === "object") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`:${key}`, value || "");
                    return null;
                });
            }

            if (!route.methods.includes("PATCH")) {
                reject("This url don't have access to 'PATCH' method");
                return null;
            }

            this.client.instance
                .patch(callUrl, body, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }

    async delete<TResponse>(
        url: TUrl<IEndpointKeys>,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TResponse>> {
        return new Promise((resolve, reject) => {
            const route: IEndpoint =
                this.client.endpoints[typeof url === "object" ? url.base : url];

            let callUrl: string = route.url;

            if (typeof url === "object") {
                Object.entries(url.params).map(([key, value]) => {
                    callUrl = callUrl.replace(`:${key}`, value || "");
                    return null;
                });
            }

            if (!route.methods.includes("DELETE")) {
                reject("This url don't have access to 'DELETE' method");
                return null;
            }

            this.client.instance
                .delete(callUrl, config)
                .then((data) => {
                    resolve(data);
                })
                .catch((errors) => {
                    reject(errors.response);
                });
        });
    }
}

export default HTTPRequest;
