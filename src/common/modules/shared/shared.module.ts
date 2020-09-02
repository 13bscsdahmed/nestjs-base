import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LogService } from '../logger/services';
import { WinstonHelper } from '../logger/helpers';
import { DatabaseModule } from '../database/database.module';
import { modelsProvider } from '../database/models/models.provider';

@Global()
@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [ LogService, WinstonHelper, ...modelsProvider ],
  exports: [ ...modelsProvider ]
  
})
export class SharedModule {}