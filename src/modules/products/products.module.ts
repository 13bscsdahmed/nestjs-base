import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsProviders } from './products.provider';
import { LogService } from '../../common/modules/logger/services';
import { WinstonHelper } from '../../common/modules/logger/helpers';

@Module({
  imports: [],
  controllers: [ ProductsController ],
  providers: [ LogService, ProductsService, ...productsProviders, WinstonHelper]
  
})
export class ProductsModule {}
