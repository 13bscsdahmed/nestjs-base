import { IsEmail, IsNotEmpty, Length, IsIn } from 'class-validator';
import { userConstants } from '@modules/user/user.constants';

export class CreateUserReq {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  firstName: string;
  
  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  @Length(8)
  password: string;
  
  @IsIn(Object.values(userConstants.userTypes))
  userType?: string;
}

export interface CreateUserRes {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  userType?: string,
}
