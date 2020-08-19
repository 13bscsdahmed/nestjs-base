import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  controllers: [],
  imports: []
})
export class DatabaseModule {}
