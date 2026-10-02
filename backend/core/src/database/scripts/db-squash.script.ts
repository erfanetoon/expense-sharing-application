import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

function run(command: string) {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: "inherit" });
}

try {
    console.log("\n1. Cleaning old migrations...");
    const migrationsDir = join(process.cwd(), "src/database/migrations");

    rmSync(migrationsDir, { recursive: true, force: true });
    mkdirSync(migrationsDir, { recursive: true });

    console.log("\n2. Dropping schema and migration history...");
    run("mikro-orm schema:drop --run --drop-migrations-table");

    console.log("\n3. Creating new initial migration...");
    run("pnpm migration:create");

    console.log("\n4. Running migrations...");
    run("pnpm migration:up");

    console.log("\n5. Running seeders...");
    run("pnpm seed:up");

    console.log("Database successfully squashed and reset!");
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Operation failed:", error.message);
    } else {
        console.error("Operation failed:", error);
    }
    process.exit(1);
}
