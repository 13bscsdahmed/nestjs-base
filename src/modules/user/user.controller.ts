import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserReq, CreateUserRes } from '@modules/user/models/create-user-dto';
import { UserService } from '@modules/user/user.service';
import { Request } from 'express';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';
import { GetUserRes } from '@modules/user/models/get-user-dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  async createUser(@Body() user: CreateUserReq, @Req() req: Request): Promise<ResponseObj<CreateUserRes>> {
    try {
      return await this.userService.createUser(user, req.reqId);
    } catch (error) {
      return error
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') userId: string, @Req() req: Request): Promise<ResponseObj<GetUserRes>> {
    try {
      return await this.userService.getUserById(userId, req.reqId);
    } catch (error) {
      return error
    }
  }
}
