import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import { LoggerMiddleware } from "~logger/logger.middleware";
import { createPinoParams } from "~logger/pino.options";
import { ExpenseModule } from "~modules/expense/expense.module";
import { HealthCheckModule } from "~modules/health-check/health-check.module";
import { ConfigModule } from "~modules/shared/config/config.module";
import { DatabaseModule } from "~modules/shared/database/database.module";
import { UserModule } from "~modules/user/user.module";
import { AppController } from "./app.controller";

@Module({
    imports: [
        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                createPinoParams(configService),
        }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 120,
                },
            ],
        }),
        ConfigModule,
        DatabaseModule,
        UserModule,
        ExpenseModule,
        HealthCheckModule,
    ],
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
