import { Module } from "@nestjs/common";
import { UserModule } from "~modules/user/user.module";
import { BalanceController } from "./balance.controller";
import { BalanceService } from "./balance.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
    imports: [UserModule],
    controllers: [ExpenseController, BalanceController],
    providers: [ExpenseService, BalanceService],
})
export class ExpenseModule {}
