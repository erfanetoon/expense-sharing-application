export interface IAppConfig {
    env: string;
    port: number;
    baseUrl: string;
    allowedHosts: string[];
    name: string;
    frontendDist: string;
}

export interface IDatabaseConfig {
    file: string;
    debug: boolean;
}
