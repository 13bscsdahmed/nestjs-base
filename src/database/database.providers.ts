import * as mongoose from 'mongoose';
import { constants } from '../config/app.constants';

export const databaseProviders = [
  {
    provide: constants.providers.DB_PROVIDER,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      try {
        const connection =  await mongoose.connect('mongodb+srv://danish:admin123@nestapp-cluster.2u3dt.mongodb.net/nestapp-cluster?retryWrites=true&w=majority');
        console.log('Successfully connected to DB');
        return connection;
      } catch(error) {
        console.log(`An error occurred connecting to DB. Error: ${JSON.stringify(error)}`);
      }
    }
  }
];
