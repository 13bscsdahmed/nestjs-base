import { Connection } from 'mongoose';
import { appConstants } from '../../../../config/app.constants';
import { modelsConfig } from './config/models.config';
import { LogService } from '../../logger/services';

export const modelsProvider = [];

// Injecting Db models dynamically
Object.keys(modelsConfig).forEach((key) => {
  modelsProvider.push({
    provide: modelsConfig[key].provider,
    inject: [appConstants.providers.DB_PROVIDER, LogService],
    useFactory: (connection: Connection, logService: LogService) => {
      logService.info(undefined, `Loading model: ${modelsConfig[key].name}`);
      return connection.model(modelsConfig[key].name, modelsConfig[key].schema)
    }
  })
});
