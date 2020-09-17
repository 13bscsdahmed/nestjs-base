import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LogService } from './common/modules/logger/services';
import { requestMiddleware } from './common/modules/shared/middlewares/request.middleware';
import { appConstants } from './config/app.constants';
import { UnauthorizedExceptionFilter } from './common/modules/shared/filters/unauthorized-exception.filter';

async function bootstrap() {
  let app;
  let configService: ConfigService;
  let logService: LogService;
  try {
    app = await NestFactory.create(AppModule);
    
    // Use customized unauthorized exception filter
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    
    // Setting app prefix
    app.setGlobalPrefix(appConstants.appPrefix);
    
    configService = app.get(ConfigService);
    const port = configService.get('PORT') || 3000;
    logService = app.get(LogService);
    logService.info(undefined, 'App initialized successfully');
    // Use global request middleware
    app.use(requestMiddleware);
    
    await app.listen(port);
    logService.info(undefined, `App started on port: ${port}`);
    
  } catch (error) {
    logService.error(undefined, `An error occurred initializing app. Error: ${error}`);
    process.exit(1);
  }
  
}
bootstrap();
