import { Controller, Post, Get, Body, Param, HttpStatus, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { LogService } from '../../common/modules/logger/services';
import { Request } from 'express';
import { Response } from '../../common/modules/shared/interceptors/response.interceptor';
import { ProductsHelper } from '@modules/products/products.helper';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService,
              private productsHelper: ProductsHelper,
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
  async getProduct(@Param('id') prodId: string, @Req() req: Request ): Promise<Response> {
    this.logService.info(req.reqId, `Fetching product with id: ${prodId}`);
    const product = await this.productsHelper.getProductById(prodId, req.reqId);
    return {
      code: 1,
      message: 'Product found successfully',
      data: product
    }
    // throw new NotFoundException({code: 2, msg: 'Could not find product', status: HttpStatus.NOT_FOUND},);
  }
}
