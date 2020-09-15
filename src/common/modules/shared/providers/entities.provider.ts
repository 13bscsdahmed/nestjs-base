import { Connection } from 'mongoose';
import { appConstants } from '../../../../config/app.constants';
import { entitiesConfig } from '../../database/entities-config/config';
import { LogService } from '../../logger/services';

export const entitiesProvider = [];

// Injecting Db models dynamically
Object.keys(entitiesConfig).forEach((key) => {
  entitiesProvider.push({
    provide: entitiesConfig[key].provider,
    inject: [appConstants.providers.DB_PROVIDER, LogService],
    useFactory: (connection: Connection, logService: LogService) => {
      logService.info(undefined, `Loading database entity: ${entitiesConfig[key].name}`);
      return connection.model(entitiesConfig[key].name, entitiesConfig[key].schema)
    }
  })
});
