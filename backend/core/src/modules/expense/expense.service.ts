import { EntityManager } from "@mikro-orm/core";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ExpenseEntity } from "~database/entities/expense/entity";
import type { UserEntity } from "~database/entities/user/entity";
import { UserService } from "~modules/user/user.service";

export function toExpenseDto(expense: ExpenseEntity) {
    return {
        id: expense.id,
        amount: expense.amount,
        description: expense.description,
        occurredAt: new Date(expense.occurredAt).toISOString(),
        payer: toUser(expense.payer),
        payee: toUser(expense.payee),
    };
}

function toUser(user: UserEntity) {
    return {
        id: user.id,
        name: user.name,
    };
}

@Injectable()
export class ExpenseService {
    constructor(
        private readonly em: EntityManager,
        private readonly userService: UserService,
    ) {}

    async list() {
        const expenses = await this.em.find(
            ExpenseEntity,
            {},
            {
                populate: ["payer", "payee"],
                orderBy: { occurredAt: "DESC", id: "DESC" },
            },
        );

        return expenses.map(toExpenseDto);
    }

    async create(input: {
        payerId: number;
        payeeId: number;
        amount: number;
        description: string;
    }) {
        if (input.payerId === input.payeeId) {
            throw new BadRequestException(
                "Paid by and expense for must be different people",
            );
        }

        const payer = await this.userService.requireById(input.payerId);
        const payee = await this.userService.requireById(input.payeeId);
        const occurredAt = new Date();

        const expense = this.em.create(ExpenseEntity, {
            payer,
            payee,
            amount: input.amount,
            description: input.description.trim(),
            occurredAt,
            createdAt: occurredAt,
        });

        await this.em.flush();
        return toExpenseDto(expense);
    }
}
