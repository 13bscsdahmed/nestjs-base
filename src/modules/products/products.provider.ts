import { Connection } from 'mongoose';
import { ProductSchema } from './models/product.model';
import { constants } from '../../config/app.constants';

export const productsProviders = [
  {
    provide: constants.providers.PRODUCT_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [constants.providers.DB_PROVIDER],
  },
];
