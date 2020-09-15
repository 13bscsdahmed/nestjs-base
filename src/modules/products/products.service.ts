import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '@repos/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProductById(id: string, reqId: string): Promise<any> {
    return this.productsRepository.findOne(
      {_id: id},
      [],
      [],
      reqId
    );
  }
}
