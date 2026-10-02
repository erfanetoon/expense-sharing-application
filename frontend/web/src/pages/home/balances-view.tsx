import type { Balance } from "~apiHooks/models";
import { Box, Stack, Typography } from "~material/components";
import { formatMoney } from "~utils/money";

const BalancesView = ({ balances }: { balances: Balance[] }) => {
    if (balances.length === 0) {
        return (
            <Typography sx={{ py: 6, textAlign: "center" }}>
                Everyone is settled up.
            </Typography>
        );
    }

    return (
        <Stack spacing={1.5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Multiple expenses between the same two people are combined into
                one net balance.
            </Typography>
            {balances.map((balance) => (
                <Stack
                    key={`${balance.debtor.id}-${balance.creditor.id}`}
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: "#f7fbf8",
                    }}
                >
                    <Typography>
                        <Box component="span" sx={{ fontWeight: 700 }}>
                            {balance.debtor.name}
                        </Box>{" "}
                        owes{" "}
                        <Box component="span" sx={{ fontWeight: 700 }}>
                            {balance.creditor.name}
                        </Box>
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: "primary.dark" }}>
                        {formatMoney(balance.amount)}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
};

export default BalancesView;
