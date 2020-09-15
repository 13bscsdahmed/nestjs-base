import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserReq, CreateUserRes } from '@modules/user/models/create-user-dto';
import { UserService } from '@modules/user/user.service';
import { Request } from 'express';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';
import { userConstants } from './user.constants';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  async createUser(@Body() user: CreateUserReq, @Req() req: Request): Promise<ResponseObj> {
    try {
      const data: CreateUserRes = await this.userService.createUser(user, req.reqId);
      return {
        ...userConstants.responseMessages.userCreated,
        ... { data }
      }
    } catch (error) {
      return error
    }
  }
}
