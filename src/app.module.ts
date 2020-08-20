import { Module } from '@nestjs/common';
import { ProductsModule } from '@modules/products/products.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/modules/logger/logger.module';


@Module({
  imports: [
    ProductsModule,
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
