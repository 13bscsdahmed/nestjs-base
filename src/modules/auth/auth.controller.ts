import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';
import { AuthService } from './auth.service';
import { UserLoginReq } from './models/user-login-dto';
import { authConstants } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Body() user: UserLoginReq, @Req() req: Request): Promise<ResponseObj<any>> {
    try {
      const token = await this.authService.login(user, req.reqId);
      req.res.setHeader('access_token', token);
      return {
      ...authConstants.responseMessages.userLoggedIn,
      ... { data: {} }
      }
    } catch (error) {
      return error
    }
  }
}
