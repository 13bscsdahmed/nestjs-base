import { Connection } from 'mongoose';
import { ProductSchema } from '../db-models';
import { appConstants } from '../config/app.constants';
import { providerConfig}  from './config/providers.config';

export const appProviders = [];

// Injecting Db models dynamically
providerConfig.providers.forEach((provider) => {
  appProviders.push({
    provide: provider.provider,
    useFactory: (connection: Connection) => connection.model(provider.name, provider.schema),
    inject: [providerConfig.dbProvider],
  })
});
console.log(appProviders);
