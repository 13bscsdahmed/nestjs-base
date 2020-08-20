import { Connection } from 'mongoose';
import { appConstants } from '../../../../config/app.constants';
import { modelsConfig } from './config/models.config';


export const modelsProvider = [
];

// Injecting Db models dynamically
modelsConfig.providers.forEach((model) => {
  modelsProvider.push({
    provide: model.provider,
    useFactory: (connection: Connection) => connection.model(model.name, model.schema),
    inject: [appConstants.providers.DB_PROVIDER],
  })
});
