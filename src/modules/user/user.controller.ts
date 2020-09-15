import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserReq } from '@modules/user/models/create-user-req';
import { UserService } from '@modules/user/user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  createUser(@Body() user: CreateUserReq, @Req() req: Request) {
    this.userService.createUser(user, req.reqId).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
    
  }
}
