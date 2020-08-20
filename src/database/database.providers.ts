import * as mongoose from 'mongoose';
import { constants } from '../config/app.constants';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: constants.providers.DB_PROVIDER,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      (mongoose as any).Promise = global.Promise;
      try {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const dbName = configService.get('MONGO_DB_NAME');
        const connection =  await mongoose.connect(`mongodb+srv://${username}:${password}@nestapp-cluster.2u3dt.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        console.log('Successfully connected to DB');
        return connection;
      } catch(error) {
        console.log(`An error occurred connecting to DB. Error: ${JSON.stringify(error)}`);
      }
    }
  }
];
