import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import pg from 'pg';

import { ConsoleExplorer, ListCommands } from './console';
import { AppConfig } from './utils';
import { BaseValidator, IsValueFromConfigConstraint } from './validator';
import { StorageService } from './storage';
import { QueueService } from './queue/service';
import config from '@config/index';
import { ObjectionModule } from '@libs/database';

pg.types.setTypeParser(20, (val) => parseInt(val));
@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get("db");
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppConfig,
    BaseValidator,
    IsValueFromConfigConstraint,
    ConsoleExplorer,
    ListCommands,
    StorageService,
    QueueService
  ],
  exports: [BaseValidator,QueueService],
})
export class CoreModule {}
