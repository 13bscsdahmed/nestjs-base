import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './common/modules/shared/shared.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TodoModule } from '@modules/todos/todo.module';


@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.argv.length > 2 && process.argv[2]  === 'prod' ? '.env' : '.env.dev'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
