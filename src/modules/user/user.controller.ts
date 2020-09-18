import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserReq, CreateUserRes } from '@modules/user/models/create-user-dto';
import { UserService } from '@modules/user/user.service';
import { Request } from 'express';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';
import { GetUserRes } from '@modules/user/models/get-user-dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../common/modules/shared/decorators/roles.decorator';
import { userConstants } from '@modules/user/user.constants';
import { RolesGuard } from '../../common/modules/shared/guards/roles.guard';


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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userConstants.userTypes.user, userConstants.userTypes.admin)
  @Get(':id')
  async getUserById(@Param('id') userId: string, @Req() req: Request): Promise<ResponseObj<GetUserRes>> {
    try {
      return await this.userService.getUserById(userId, req.reqId);
    } catch (error) {
      return error
    }
  }
}
