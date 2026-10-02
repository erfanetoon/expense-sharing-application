import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import type { User } from "~apiHooks/models";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "~material/components";
import { apis } from "~services/request";

const formSchema = z
    .object({
        payerId: z.string().min(1, "Choose who paid"),
        payeeId: z.string().min(1, "Choose who this expense is for"),
        amount: z
            .string()
            .trim()
            .regex(/^\d+(\.\d{1,2})?$/, "Enter an amount like 12.50")
            .refine(
                (value) => Number(value) > 0,
                "Amount must be greater than zero",
            ),
        description: z.string().trim().min(1, "Add a description").max(500),
    })
    .refine((value) => value.payerId !== value.payeeId, {
        message: "Paid by and expense for must be different people",
        path: ["payeeId"],
    });

type FormValues = z.infer<typeof formSchema>;

const dollarsToCents = (value: string) => {
    const [whole, fraction = ""] = value.split(".");
    return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
};

const AddExpenseDialog = ({
    open,
    users,
    onClose,
}: {
    open: boolean;
    users: User[];
    onClose: () => void;
}) => {
    const queryClient = useQueryClient();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            payerId: "",
            payeeId: "",
            amount: "",
            description: "",
        },
    });

    const createExpense = apis["v1.expenses"].usePost({
        options: {
            onSuccess: async () => {
                await queryClient.invalidateQueries();
                reset();
                onClose();
            },
        },
    });

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <form
                onSubmit={handleSubmit((values) => {
                    createExpense.mutate({
                        payerId: Number(values.payerId),
                        payeeId: Number(values.payeeId),
                        amount: dollarsToCents(values.amount),
                        description: values.description.trim(),
                    });
                })}
            >
                <DialogTitle>Add expense</DialogTitle>
                <DialogContent>
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <Controller
                            name="payerId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Paid by"
                                    fullWidth
                                    error={Boolean(errors.payerId)}
                                    helperText={errors.payerId?.message}
                                >
                                    <MenuItem value="" disabled>
                                        Select a person
                                    </MenuItem>
                                    {users.map((user) => (
                                        <MenuItem
                                            key={user.id}
                                            value={String(user.id)}
                                        >
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Controller
                            name="payeeId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Expense for"
                                    fullWidth
                                    error={Boolean(errors.payeeId)}
                                    helperText={errors.payeeId?.message}
                                >
                                    <MenuItem value="" disabled>
                                        Select a person
                                    </MenuItem>
                                    {users.map((user) => (
                                        <MenuItem
                                            key={user.id}
                                            value={String(user.id)}
                                        >
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField
                            label="Amount"
                            placeholder="50.00"
                            fullWidth
                            error={Boolean(errors.amount)}
                            helperText={errors.amount?.message ?? "US dollars"}
                            {...register("amount")}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                            {...register("description")}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={createExpense.isPending}
                    >
                        Save expense
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddExpenseDialog;
