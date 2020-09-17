import { Controller, Post, Get, Body, Param, HttpStatus, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { LogService } from '../../common/modules/logger/services';
import { Request } from 'express';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';

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
  async getProduct(@Param('id') prodId: string, @Req() req: Request ): Promise<ResponseObj<any>> {
    this.logService.info(req.reqId, `Fetching product with id: ${prodId}`);
    const product = await this.productsService.getProductById(prodId, req.reqId);
    return {
      success: 1,
      message: 'Product found successfully',
      data: product
    }
    // throw new NotFoundException({code: 2, msg: 'Could not find product', status: HttpStatus.NOT_FOUND},);
  }
}
