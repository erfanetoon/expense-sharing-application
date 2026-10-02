import { copy } from "@packages/translation/messages";
import { useState } from "react";
import { TbPlus, TbReceipt, TbScale } from "react-icons/tb";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "~material/components";
import { apis } from "~services/request";
import AddExpenseDialog from "./add-expense-dialog";
import BalancesView from "./balances-view";
import ExpensesView from "./expenses-view";

const HomePage = () => {
    const [view, setView] = useState<"expenses" | "balances">("expenses");
    const [open, setOpen] = useState(false);

    const usersQuery = apis["v1.users"].useGet({});
    const expensesQuery = apis["v1.expenses"].useGet({});
    const balancesQuery = apis["v1.balances"].useGet({});

    const users = usersQuery.data?.data.data ?? [];
    const expenses = expensesQuery.data?.data.data ?? [];
    const balances = balancesQuery.data?.data.data ?? [];
    const isLoading =
        usersQuery.isLoading ||
        expensesQuery.isLoading ||
        balancesQuery.isLoading;
    const isError =
        usersQuery.isError || expensesQuery.isError || balancesQuery.isError;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f3f6f4" }}>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 } }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    sx={{
                        alignItems: { sm: "flex-end" },
                        justifyContent: "space-between",
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{ color: "primary.dark", letterSpacing: 1.4 }}
                        >
                            Shared ledger
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 700, letterSpacing: -0.6 }}
                        >
                            {copy.appName}
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                maxWidth: 460,
                                color: "text.secondary",
                            }}
                        >
                            {copy.tagline}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<TbPlus />}
                        onClick={() => setOpen(true)}
                        disabled={users.length === 0}
                    >
                        Add Expense
                    </Button>
                </Stack>

                <Box
                    sx={{
                        bgcolor: "#fff",
                        border: "1px solid",
                        borderColor: "#e2ebe6",
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    <Tabs
                        value={view}
                        onChange={(_event, next) => setView(next)}
                        sx={{ px: 2, borderBottom: "1px solid #e2ebe6" }}
                    >
                        <Tab
                            value="expenses"
                            icon={<TbReceipt />}
                            iconPosition="start"
                            label="Expenses"
                        />
                        <Tab
                            value="balances"
                            icon={<TbScale />}
                            iconPosition="start"
                            label="Balances"
                        />
                    </Tabs>

                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        {isLoading ? (
                            <Stack sx={{ py: 8, alignItems: "center" }}>
                                <CircularProgress />
                            </Stack>
                        ) : isError ? (
                            <Alert severity="error">
                                The ledger could not be loaded. Check that the
                                API is running and refresh the page.
                            </Alert>
                        ) : view === "expenses" ? (
                            <ExpensesView expenses={expenses} />
                        ) : (
                            <BalancesView balances={balances} />
                        )}
                    </Box>
                </Box>
            </Container>

            <AddExpenseDialog
                open={open}
                users={users}
                onClose={() => setOpen(false)}
            />
        </Box>
    );
};

export default HomePage;
