import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigService } from '@nestjs/config';
import { modelsProvider } from './models/models.provider';

@Module({
  providers: [...databaseProviders, ...modelsProvider],
  exports: [...databaseProviders, ...modelsProvider]
})
export class DatabaseModule {}
