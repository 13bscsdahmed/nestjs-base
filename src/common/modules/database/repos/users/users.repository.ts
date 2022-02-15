import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { entitiesConfig } from '../../entities-config/config';
import { User } from './user.model';
import { Model } from 'mongoose';
import { userConstants } from '@modules/user/user.constants';
import { CreateUserReq } from '@modules/user/models/create-user-dto';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(@Inject(entitiesConfig.user.provider) private UserModel: Model<User>){
    super(UserModel, 'Users');
  }
  
  /**
   * Helper function to construct user object to be saved in database
   * @param {Object} [user] - user object
   * @param {String} [reqId] - req id
   */
  constructUserObject(user: CreateUserReq, reqId: string): User {
    this.logService.debug(reqId, `[${this.repoName} Repository]: Constructing ${this.repoName} object for user with email: ${user.email}`);
    return new this.UserModel({
      email: user.email,
      password: user.password,
      firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
      lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1),
      userType: user.userType || userConstants.userTypes.user
    });
  };
}
