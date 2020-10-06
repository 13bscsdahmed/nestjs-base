import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UsersRepository } from '@repos/users/users.repository';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders, UsersRepository ],
  exports: [...databaseProviders, UsersRepository ]
})
export class DatabaseModule {}
