import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@repos/users/users.repository';
import { CreateUserReq } from '@modules/user/models/create-user-req';
import { async } from 'async';

@Injectable()
export class UserService extends UsersRepository {
  createUser(user: CreateUserReq, reqId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve();
    })
  
  }
}
