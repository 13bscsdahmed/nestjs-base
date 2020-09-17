import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: authConstants.jwtExpiry },
    }),
  ],
  providers: [ AuthService, JwtStrategy ],
  exports: [ AuthService ],
  controllers: [AuthController],
})
export class AuthModule {}
