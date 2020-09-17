import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: authConstants.jwtExpiry },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
