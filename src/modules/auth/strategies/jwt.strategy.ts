import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authConstants } from '@modules/auth/auth.constants';
import { UsersRepository } from '@repos/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }
  
  async validate(payload: any): Promise<any> {
    try {
      const data = await this.usersRepository.findOne({_id: payload._id}, [], [], undefined);
      if (data) {
        return data;
      } else {
        return new UnauthorizedException();
      }
    } catch(error){
      return new UnauthorizedException();
    }
  }
}
