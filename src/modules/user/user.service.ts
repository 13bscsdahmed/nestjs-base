import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '@repos/users/users.repository';
import { CreateUserReq, CreateUserRes } from '@modules/user/models/create-user-dto';
import async from 'async';
import { LogService } from '../../common/modules/logger/services';
import { userErrors } from '@modules/user/user.errors';
import { User } from '@repos/users/user.model';
import { userConstants } from './user.constants';
import { GetUserRes } from '@modules/user/models/get-user-dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository,
              private logService: LogService) {}
  createUser(user: CreateUserReq, reqId: string): Promise<any> {
    let savedUser: CreateUserRes;
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
            saveUser({...userErrors['2001'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
          })
        },
      ], (err) => {
        if (!err) {
          resolve(
            {
              ...userConstants.responseMessages.userCreated,
              ... { data: savedUser }
            }
            );
        } else {
          reject(err);
        }
      });
    });
  }
  getUserById(userId: string, reqId: string): Promise<any> {
    let fetchedUser: GetUserRes;
    return new Promise<any>((resolve, reject) => {
      async.waterfall([
        (fetchUser) => {
          this.usersRepository.findOne({_id: userId}, [], ['-password', '-__v'], reqId).then((data: User) => {
            if (data) {
              fetchedUser = data;
              fetchUser();
            } else {
              fetchUser({...userErrors['2002'], ...{ statusCode: HttpStatus.NOT_FOUND } });
            }
          }).catch((error) => {
            this.logService.error(reqId, `An error occurred fetching user with id: ${userId}. Error: ${JSON.stringify(error)}`);
            fetchUser({...userErrors['2003'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
          })
        },
      ], (err) => {
        if (!err) {
          resolve(
            {
              ...userConstants.responseMessages.userFetched,
              ... { data: fetchedUser }
            }
          );
        } else {
          reject(err);
        }
      });
    });
  }
}
