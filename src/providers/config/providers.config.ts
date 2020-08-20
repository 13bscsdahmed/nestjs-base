import { ProductSchema } from '../../db-models';

export const providerConfig = {
  dbProvider: 'db_connection',
  providers: [
    {
      name: 'Product',
      provider: 'product_model_provider',
      schema: ProductSchema
    }
  ]
};
