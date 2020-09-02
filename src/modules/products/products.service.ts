import { Inject, Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/modules/database/base/base.repository';
import { modelsConfig } from '../../common/modules/database/models/config/models.config';

@Injectable()
export class ProductsService extends BaseRepository{
  products: Product[] = [];
  
  constructor(@Inject(modelsConfig.product.provider) private productModel: Model<Product>){
    super(productModel, 'Products');
  }
}
