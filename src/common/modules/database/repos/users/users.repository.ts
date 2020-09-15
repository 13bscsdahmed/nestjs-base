import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { entitiesConfig } from '../../entities-config/config';
import { User } from './user.model';
import { Model } from 'mongoose';
import { usersConstants } from '@modules/user/config/constants';

@Injectable()
export class UsersRepository extends BaseRepository{
  constructor(@Inject(entitiesConfig.user.provider) private UserModel: Model<User>){
    super(UserModel, 'Users');
  }
  
  /**
   * Helper function to construct user object to be saved in database
   * @param {Object} [user] - user object
   * @param {String} [reqId] - req id
   */
  constructUserObject(user: User, reqId: string): User {
    this.logService.debug(reqId, `[${this.repoName} Repository]: Constructing ${this.repoName} object for user with email: ${user.email}`);
    return new this.UserModel({
      email: user.email,
      firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
      lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1),
      userType: user.userType || usersConstants.userTypes.user
    });
  };
}
