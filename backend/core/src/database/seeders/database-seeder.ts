import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { seedDatabase } from "./seed-database";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        await seedDatabase(em);
    }
}
