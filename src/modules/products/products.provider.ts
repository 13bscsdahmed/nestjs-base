import { Connection } from 'mongoose';
import { ProductSchema } from './models/product.model';
import { appConstants } from '../../config/app.constants';

export const productsProviders = [
  {
    provide: appConstants.providers.PRODUCT_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [appConstants.providers.DB_PROVIDER],
  },
];
