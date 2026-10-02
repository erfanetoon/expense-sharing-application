import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import Axios from "axios";
import apis from "~apiHooks";
import endpoints from "./endpoints";
import HTTPRequest from "./httpRequest";

class CoreRequest {
    private axios: AxiosInstance;
    httpRequest: HTTPRequest<keyof typeof endpoints>;
    private axiosEndpoints: typeof endpoints;

    constructor({
        baseURL,
        config,
    }: {
        baseURL: string;
        config: Omit<CreateAxiosDefaults, "baseURL">;
    }) {
        this.axios = Axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json",
                ...config.headers,
            },
            ...config,
        });

        this.axiosEndpoints = endpoints;

        this.httpRequest = new HTTPRequest<keyof typeof endpoints>({
            instance: this.axios,
            endpoints: this.axiosEndpoints,
        });
    }

    setHeader({ key, value }: { key: string; value: string }) {
        this.axios.defaults.headers.common[key] = value;
    }

    removeHeader(key: string) {
        this.axios.defaults.headers.common[key] = undefined;
    }

    get instance(): AxiosInstance {
        return this.axios;
    }

    get endpoints() {
        return this.axiosEndpoints;
    }

    get apis() {
        return apis(this.httpRequest);
    }
}

export default CoreRequest;
