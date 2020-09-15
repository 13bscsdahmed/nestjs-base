import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ProductsRepository } from '@repos/products/products.repository';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders, ProductsRepository ],
  exports: [...databaseProviders, ProductsRepository ]
})
export class DatabaseModule {}
