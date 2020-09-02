import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsHelper } from '@modules/products/products.helper';

@Module({
  imports: [],
  controllers: [ ProductsController ],
  providers: [ ProductsService, ProductsHelper ]
  
})
export class ProductsModule {}
