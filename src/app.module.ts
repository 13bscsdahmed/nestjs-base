import { Module } from '@nestjs/common';
import { ProductsModule } from '@modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './common/modules/shared/shared.module';


@Module({
  imports: [
    SharedModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
