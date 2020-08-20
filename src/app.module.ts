import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
