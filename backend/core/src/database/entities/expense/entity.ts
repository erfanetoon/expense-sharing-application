import { defineEntity, p } from "@mikro-orm/core";
import { UserEntity } from "../user/entity";

export const expenseSchema = defineEntity({
    name: "Expense",
    tableName: "expenses",
    properties: {
        id: p.integer().primary().autoincrement(),
        payer: () => p.manyToOne(UserEntity).fieldName("payer_id"),
        payee: () => p.manyToOne(UserEntity).fieldName("payee_id"),
        amount: p.integer(),
        description: p.string().length(500),
        occurredAt: p.datetime().fieldName("occurred_at"),
        createdAt: p.datetime().fieldName("created_at"),
    },
});

export class ExpenseEntity extends expenseSchema.class {}

expenseSchema.setClass(ExpenseEntity);
