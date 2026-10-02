import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { ExpenseEntity } from "~database/entities/expense/entity";

type Party = {
    id: number;
    name: string;
};

@Injectable()
export class BalanceService {
    constructor(private readonly em: EntityManager) {}

    /**
     * Each expense is directional: the payee owes the payer.
     * Opposite expenses between the same pair are subtracted so one net line remains.
     */
    async list() {
        const expenses = await this.em.find(
            ExpenseEntity,
            {},
            { populate: ["payer", "payee"] },
        );
        const people = new Map<number, Party>();
        const directed = new Map<string, number>();

        for (const expense of expenses) {
            people.set(expense.payer.id, {
                id: expense.payer.id,
                name: expense.payer.name,
            });
            people.set(expense.payee.id, {
                id: expense.payee.id,
                name: expense.payee.name,
            });

            const key = `${expense.payee.id}:${expense.payer.id}`;
            directed.set(key, (directed.get(key) ?? 0) + expense.amount);
        }

        const seen = new Set<string>();
        const balances: Array<{
            amount: number;
            debtor: Party;
            creditor: Party;
        }> = [];

        for (const [key, amount] of directed) {
            const [debtorId, creditorId] = key.split(":").map(Number);
            const pair = [debtorId, creditorId].sort((a, b) => a - b).join(":");
            if (seen.has(pair)) {
                continue;
            }
            seen.add(pair);

            const reverse = directed.get(`${creditorId}:${debtorId}`) ?? 0;
            const net = amount - reverse;
            if (net === 0) {
                continue;
            }

            const debtor = net > 0 ? debtorId : creditorId;
            const creditor = net > 0 ? creditorId : debtorId;
            const owing = people.get(debtor);
            const owed = people.get(creditor);
            if (!owing || !owed) {
                continue;
            }

            balances.push({
                amount: Math.abs(net),
                debtor: owing,
                creditor: owed,
            });
        }

        balances.sort(
            (left, right) =>
                left.debtor.name.localeCompare(right.debtor.name) ||
                left.creditor.name.localeCompare(right.creditor.name),
        );

        return balances;
    }
}
