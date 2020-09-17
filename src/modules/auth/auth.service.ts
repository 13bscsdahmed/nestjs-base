import { HttpStatus, Injectable } from '@nestjs/common';
import async from 'async';
import { UsersRepository } from '@repos/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserLoginReq } from './models/user-login-dto';
import { User } from '@repos/users/user.model';
import { LogService } from '../../common/modules/logger/services';
import { authErrors } from './auth.errors';

@Injectable()
export class AuthService {
  constructor(
              private usersRepository: UsersRepository,
              private jwtService: JwtService,
              private logService: LogService
  ) {}
  login(user: UserLoginReq, reqId: string): Promise<any> {
    let foundUser;
    let token;
    return new Promise<any>((resolve, reject) => {
      async.waterfall([
        (findUser) => {
          this.usersRepository.findOne({ email: user.email }, [], [], reqId).then((data: User) => {
            if (data) {
              foundUser = data;
              findUser();
            } else {
              findUser({...authErrors['1001'], ...{ statusCode: HttpStatus.BAD_REQUEST } });
            }
          }).catch((error) => {
            this.logService.error(reqId, `An error occurred logging in user with email: ${user.email}. Error: ${JSON.stringify(error)}`);
            findUser({...authErrors['1002'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
          })
        },
        (matchPassword) => {
          foundUser.comparePassword(user.password, (error, isMatch) => {
            if (error) {
              this.logService.error(reqId, `An error occurred comparing passwords: ${user.email}. Error: ${JSON.stringify(error)}`);
              matchPassword({...authErrors['1002'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
            } else if (!isMatch) {
              this.logService.info(reqId, `Invalid pass provided for user with email: ${user.email}`);
              matchPassword({...authErrors['1001'], ...{ statusCode: HttpStatus.BAD_REQUEST } });
            } else {
              token = this.jwtService.sign( {
                _id: foundUser._id,
                userType: foundUser.userType,
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
              });
              matchPassword();
            }
          });
        }
      ], (err) => {
        if (!err) {
          resolve(token);
        } else {
          reject(err);
        }
      });
    });
  }
}
