import type { EntityManager } from "@mikro-orm/core";
import { ExpenseEntity } from "../entities/expense/entity";
import { UserEntity } from "../entities/user/entity";

const users = ["Alice", "Bob", "Charlie", "David"] as const;

/**
 * Sample expenses net to the balances in the product brief:
 * Alice owes Bob $120, Charlie owes Alice $50, David owes Bob $30.
 * Alice and Bob have two expenses so the pair is netted, not listed twice.
 */
const expenses: Array<{
    payer: (typeof users)[number];
    payee: (typeof users)[number];
    dollars: number;
    description: string;
    occurredAt: string;
}> = [
    {
        payer: "Bob",
        payee: "Alice",
        dollars: 150,
        description: "September rent",
        occurredAt: "2026-09-12T12:00:00.000Z",
    },
    {
        payer: "Alice",
        payee: "Bob",
        dollars: 30,
        description: "Groceries",
        occurredAt: "2026-09-18T12:00:00.000Z",
    },
    {
        payer: "Alice",
        payee: "Charlie",
        dollars: 50,
        description: "Dinner",
        occurredAt: "2026-09-21T12:00:00.000Z",
    },
    {
        payer: "Bob",
        payee: "David",
        dollars: 30,
        description: "Taxi",
        occurredAt: "2026-09-25T12:00:00.000Z",
    },
];

export async function seedDatabase(em: EntityManager) {
    const existing = await em.count(UserEntity);
    if (existing > 0) {
        return;
    }

    const createdAt = new Date("2026-09-01T12:00:00.000Z");
    const byName = new Map<string, UserEntity>();

    for (const name of users) {
        const user = em.create(UserEntity, { name, createdAt });
        byName.set(name, user);
    }

    for (const expense of expenses) {
        const payer = byName.get(expense.payer);
        const payee = byName.get(expense.payee);
        if (!payer || !payee) {
            throw new Error(`Missing seeded user for ${expense.description}`);
        }

        em.create(ExpenseEntity, {
            payer,
            payee,
            amount: expense.dollars * 100,
            description: expense.description,
            occurredAt: new Date(expense.occurredAt),
            createdAt: new Date(expense.occurredAt),
        });
    }

    await em.flush();
}
