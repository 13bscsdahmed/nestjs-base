import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
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
    return this.productsService.findOne(
      {_id: prodId},
      [],
      [],
      undefined
    );
  }
}
