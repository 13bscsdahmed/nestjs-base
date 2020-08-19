import { Inject, Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { Model } from 'mongoose';
import { constants } from '../../config/app.constants';
import { BaseRepository } from '../../database/base/base.repository';

@Injectable()
export class ProductsService extends BaseRepository{
  products: Product[] = [];
  
  constructor(@Inject(constants.providers.PRODUCT_PROVIDER) private productModel: Model<Product>){
    super(productModel, 'Products');
  }
}
