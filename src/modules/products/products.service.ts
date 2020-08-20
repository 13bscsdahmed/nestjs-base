import { Inject, Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { Model } from 'mongoose';
import { appConstants } from '../../config/app.constants';
import { BaseRepository } from '../../common/modules/database/base/base.repository';

@Injectable()
export class ProductsService extends BaseRepository{
  products: Product[] = [];
  
  constructor(@Inject(appConstants.providers.PRODUCT_PROVIDER) private productModel: Model<Product>){
    super(productModel, 'Products');
  }
}
