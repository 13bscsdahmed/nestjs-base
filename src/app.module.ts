import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://danish:admin123@nestapp-cluster.2u3dt.mongodb.net/nestapp-cluster?retryWrites=true&w=majority'
    ) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
