import { ProductsService } from '@modules/products/products.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsHelper {
  constructor(private productsService: ProductsService) {}
  getProductById(id: string, reqId: string): Promise<any> {
    return this.productsService.findOne(
      {_id: id},
      [],
      [],
      reqId
    );
  }
}
