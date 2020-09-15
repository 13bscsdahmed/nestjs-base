import { ProductSchema, UserSchema } from '@repos/index';

export const entitiesConfig = {
  product: {
    name: 'Product',
    provider: 'product_model_provider',
    schema: ProductSchema
  },
  user: {
    name: 'User',
    provider: 'user_model_provider',
    schema: UserSchema
  },
};
