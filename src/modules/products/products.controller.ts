import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { LogService } from '../../common/modules/logger/services';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService,
              private logService: LogService) {}
  // @Post()
  // async addProduct(@Body() product: Product) {
  //   const generatedId = await this.productsService.insertProduct(product.title, product.description, product.price);
  //   return { id: generatedId };
  // }
  // @Get()
  // getAllProducts() {
  //   return { products: this.productsService.getProducts() };
  // }
  @Get(':id')
  getProduct(@Param('id') prodId: string ) {
    this.logService.debug('123', 'req received');
    return this.productsService.findOne(
      {_id: prodId},
      [],
      [],
      undefined
    );
  }
}
