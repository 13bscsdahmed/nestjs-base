import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { CreateUserReq, CreateUserRes } from '@modules/user/models/create-user-dto';
import { UserService } from '@modules/user/user.service';
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
  @ApiResponse({ status: 201, type: CreateUserRes, description: 'Creates new user object.' })
  async createUser(@Body() user: CreateUserReq, @Req() req: Request): Promise<ResponseObj<CreateUserRes>> {
    try {
      return await this.userService.createUser(user, req.reqId);
    } catch (error) {
      return error
    }
  }
  
  @Get(':id')
  @ApiResponse({ status: 200, type: GetUserRes, description: 'Fetches user by id.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userConstants.userTypes.user, userConstants.userTypes.admin)
  async getUserById(@Param('id') userId: string, @Req() req: Request): Promise<ResponseObj<GetUserRes>> {
    try {
      return await this.userService.getUserById(userId, req.reqId);
    } catch (error) {
      return error
    }
  }
}
