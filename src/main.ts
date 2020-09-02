import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LogService } from './common/modules/logger/services';

async function bootstrap() {
  let app;
  let configService: ConfigService;
  let logService: LogService;
  try {
    app = await NestFactory.create(AppModule);
    configService = app.get(ConfigService);
    logService = app.get(LogService);
    logService.info(undefined, 'Server initialized successfully');
    await app.listen(configService.get('PORT') || 3000);
    logService.info(undefined, `Server started on port: ${configService.get('PORT') || 3000}`);
  } catch (error) {
    logService.error(undefined, `App error occurred on port: ${configService.get('PORT') || 3000}`);
    process.exit(1);
  }
  
}
bootstrap();
