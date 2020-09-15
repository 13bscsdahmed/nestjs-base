import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ProductsRepository } from '@repos/products/products.repository';
import { UsersRepository } from '@repos/users/users.repository';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders, ProductsRepository, UsersRepository ],
  exports: [...databaseProviders, ProductsRepository, UsersRepository ]
})
export class DatabaseModule {}
