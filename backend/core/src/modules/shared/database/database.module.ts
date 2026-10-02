import { mkdirSync } from "node:fs";
import path from "node:path";
import { EntityManager, MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module, OnModuleInit } from "@nestjs/common";
import { createDatabaseConfig } from "~database/mikro-orm.config";
import { seedDatabase } from "~database/seeders/seed-database";

@Global()
@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            useFactory: () => createDatabaseConfig(),
        }),
    ],
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly orm: MikroORM) {}

    async onModuleInit() {
        const dbFile = String(this.orm.config.get("dbName"));
        mkdirSync(path.dirname(dbFile), { recursive: true });
        await this.orm.migrator.up();
        await seedDatabase(this.orm.em.fork() as EntityManager);
    }
}
