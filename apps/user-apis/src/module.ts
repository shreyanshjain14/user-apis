import { UserLibModule } from "@libs/users";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { CoreModule } from "../../../libs/core/src/module";
import {
  AdminAuthController,
  UserAuthController,
  UserController,
} from "./controllers";
import { AuthApisService } from "./services/auth";
import { UserApiService } from "./services/user";
import { IngestionController } from "./controllers/Ingestion";
import { IngestionService } from "./services/ingestion";

@Module({
  imports: [
    ConfigModule,
    UserLibModule,
    CoreModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get("auth"),
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController, UserAuthController, UserController, IngestionController],
  providers: [AuthApisService, UserApiService, IngestionService],
})
export class AuthApisModule {}
