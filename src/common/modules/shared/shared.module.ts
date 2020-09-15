import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LogService } from '../logger/services';
import { WinstonHelper } from '../logger/helpers';
import { DatabaseModule } from '../database/database.module';
import { entitiesProvider } from './providers/entities.provider';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [ LoggerModule, DatabaseModule ],
  providers: [
    LogService,
    WinstonHelper,
    ...entitiesProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
  ],
  exports: [ ...entitiesProvider ]
  
})
export class SharedModule {}
