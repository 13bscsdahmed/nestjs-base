import { ProductSchema } from '../entities/products/product.model';

export const modelsConfig = {
  providers: [
    {
      name: 'Product',
      provider: 'product_model_provider',
      schema: ProductSchema
    }
  ]
};
