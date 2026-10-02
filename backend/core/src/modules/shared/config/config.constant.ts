import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
    env: process.env.APP_ENV ?? "development",
    port: Number(process.env.APP_PORT ?? 4000),
    baseUrl: process.env.APP_BASE_URL ?? "http://localhost:4000",
    allowedHosts: (process.env.APP_ALLOWED_HOSTS ?? "")
        .split(",")
        .map((host) => host.trim())
        .filter(Boolean),
    name: process.env.APP_NAME ?? "Expense Sharing",
    frontendDist: process.env.FRONTEND_DIST ?? "",
}));

export const databaseConfig = registerAs("database", () => ({
    file: process.env.DB_FILE ?? "",
    debug: process.env.DB_DEBUG === "true",
}));
