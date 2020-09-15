import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { entitiesConfig } from '../../entities-config/config';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsRepository extends BaseRepository{
  constructor(@Inject(entitiesConfig.product.provider) private ProductModel: Model<Product>){
    super(ProductModel, 'Products');
  }
}
