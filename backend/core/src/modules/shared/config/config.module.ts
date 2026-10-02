import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { appConfig, databaseConfig } from "./config.constant";

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
            envFilePath: [".env"],
        }),
    ],
    exports: [NestConfigModule],
})
export class ConfigModule {}
