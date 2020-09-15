import { Module } from '@nestjs/common';
import { ProductsModule } from '@modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './common/modules/shared/shared.module';
import { UserModule } from '@modules/user/user.module';


@Module({
  imports: [
    SharedModule,
    ProductsModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
