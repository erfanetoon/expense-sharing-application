import type { Expense } from "~apiHooks/models";
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "~material/components";
import { formatMoney } from "~utils/money";

const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));

const ExpensesView = ({ expenses }: { expenses: Expense[] }) => {
    if (expenses.length === 0) {
        return (
            <Typography sx={{ py: 6, textAlign: "center" }}>
                No expenses yet. Add one to get started.
            </Typography>
        );
    }

    return (
        <Stack spacing={1}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Each row is one payment. The person in “Expense for” owes the
                person who paid.
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Paid by</TableCell>
                        <TableCell>Expense for</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id} hover>
                            <TableCell>
                                {formatDate(expense.occurredAt)}
                            </TableCell>
                            <TableCell>{expense.payer.name}</TableCell>
                            <TableCell>{expense.payee.name}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell align="right">
                                {formatMoney(expense.amount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Stack>
    );
};

export default ExpensesView;
