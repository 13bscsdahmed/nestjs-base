import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UsersRepository } from '@repos/users/users.repository';
import { TodoRepository } from '@repos/todo/todo.repository';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders, UsersRepository, TodoRepository ],
  exports: [...databaseProviders, UsersRepository, TodoRepository ]
})
export class DatabaseModule {}
