import { mkdirSync } from "node:fs";
import path from "node:path";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";
import { defineConfig } from "@mikro-orm/sqlite";
import dotenv from "dotenv";
import { entities } from "./entities";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export function resolveDatabaseFile() {
    return path.resolve(
        process.cwd(),
        process.env.DB_FILE ?? "./data/expense-sharing.sqlite",
    );
}

export function resolveMigrationsPath() {
    return path.resolve(
        process.cwd(),
        process.env.MIGRATIONS_PATH ?? "./src/database/migrations",
    );
}

export function createDatabaseConfig() {
    const dbFile = resolveDatabaseFile();
    mkdirSync(path.dirname(dbFile), { recursive: true });

    return defineConfig({
        dbName: dbFile,
        entities,
        debug: process.env.DB_DEBUG === "true",
        allowGlobalContext: true,
        extensions: [Migrator, SeedManager],
        migrations: {
            path: resolveMigrationsPath(),
            pathTs: resolveMigrationsPath(),
            fileName: (timestamp) => `${timestamp}.migration`,
        },
        seeder: {
            path: "./src/database/seeders",
            pathTs: "./src/database/seeders",
            defaultSeeder: "DatabaseSeeder",
        },
    });
}

export default createDatabaseConfig();
