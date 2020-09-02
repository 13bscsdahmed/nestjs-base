import * as mongoose from 'mongoose';
import { appConstants } from '../../../config/app.constants';
import { ConfigService } from '@nestjs/config';
import { LogService } from '../logger/services';

export const databaseProviders = [
  {
    provide: appConstants.providers.DB_PROVIDER,
    inject: [ConfigService, LogService],
    useFactory: async (configService: ConfigService, logService: LogService): Promise<unknown> => {
      (mongoose as any).Promise = global.Promise;
      try {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const dbName = configService.get('MONGO_DB_NAME');
        const connection =  await mongoose.connect(`mongodb+srv://${username}:${password}@nestapp-cluster.2u3dt.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        logService.info(undefined, `Successfully connected to DB: ${dbName}`);
        return connection;
      } catch(error) {
        logService.error(undefined, `An error occurred connecting to DB. Error: ${JSON.stringify(error)}`);
        process.exit(1);
      }
    }
  }
];
