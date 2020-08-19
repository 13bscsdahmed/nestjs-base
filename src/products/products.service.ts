import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  
  constructor(@InjectModel('Product') private productModel: Model<Product>){}
  
  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({title, description, price});
    await newProduct.save();
    console.log(newProduct);
    return newProduct._id as string;
  }
  getProducts() {
    return [ ...this.products ];
  }
  getProduct(productId: string) {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      throw new NotFoundException({code: 2, msg: 'Could not find product', status: HttpStatus.NOT_FOUND},);
    }
    return { ... product };
  }
}
