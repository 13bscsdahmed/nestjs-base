import { Controller, Post, Get, Body, Param, HttpStatus } from '@nestjs/common';
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
  async getProduct(@Param('id') prodId: string ) {
    const product = await this.productsService.findOne(
      {_id: prodId},
      [],
      [],
      undefined
    );
    return {
      statusCode: HttpStatus.CREATED,
      code: 1,
      message: 'Product found successfully',
      res: product
    }
    // throw new NotFoundException({code: 2, msg: 'Could not find product', status: HttpStatus.NOT_FOUND},);
  }
}
