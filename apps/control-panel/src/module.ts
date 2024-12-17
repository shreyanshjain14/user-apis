import { CoreModule } from "@libs/core";
import { UserLibModule } from "@libs/users";
import { Module } from "@nestjs/common";

import { AdminSeeder } from "./commands/createAdmin";
import { ControlPanelController } from "./controller";

@Module({
  imports: [CoreModule, UserLibModule],
  controllers: [ControlPanelController],
  providers: [AdminSeeder],
})
export class AppModule {}
