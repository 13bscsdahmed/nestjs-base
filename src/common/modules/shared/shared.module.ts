import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LogService } from '../logger/services';
import { WinstonHelper } from '../logger/helpers';
import { DatabaseModule } from '../database/database.module';
import { appProviders } from '../../../providers/app.providers';

@Global()
@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [ LogService, WinstonHelper, ...appProviders ],
  exports: [ ...appProviders ]
  
})
export class SharedModule {}
