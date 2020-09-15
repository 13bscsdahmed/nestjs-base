import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@repos/users/users.repository';
import { CreateUserReq } from '@modules/user/models/create-user-dto';
import async from 'async';
import { LogService } from '../../common/modules/logger/services';
import { userErrors } from '@modules/user/user.errors';
import { User } from '@repos/users/user.model';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository,
              private logService: LogService) {}
  createUser(user: CreateUserReq, reqId: string): Promise<any> {
    let savedUser;
    return new Promise<any>((resolve, reject) => {
      async.waterfall([
        (saveUser) => {
          this.usersRepository.save(this.usersRepository.constructUserObject(user, reqId), reqId).then((data: User) => {
            this.logService.info(reqId, `Successfully saved user with email: ${user.email}`);
            delete data.password;
            savedUser = data;
            saveUser();
          }).catch((error) => {
            this.logService.error(reqId, `An error occurred saving user with email: ${user.email}. Error: ${JSON.stringify(error)}`);
            saveUser({...userErrors['1001'], ...{ statusCode: 500 } });
          })
        },
      ], (err) => {
        if (!err) {
          resolve(savedUser);
        } else {
          reject(err);
        }
      });
    })
  
  }
}
