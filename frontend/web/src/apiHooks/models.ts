export type ApiResponse<TData> = {
    statusCode: number;
    message?: string | null;
    data: TData;
};

export type User = {
    id: number;
    name: string;
};

export type Expense = {
    id: number;
    amount: number;
    description: string;
    occurredAt: string;
    payer: User;
    payee: User;
};

export type Balance = {
    amount: number;
    debtor: User;
    creditor: User;
};

export type CreateExpenseBody = {
    payerId: number;
    payeeId: number;
    amount: number;
    description: string;
};

export type HealthCheckData = {
    sqlite: {
        status: "UP" | "DOWN";
        message?: string;
    };
};
