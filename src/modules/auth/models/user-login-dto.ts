import { ApiProperty } from '@nestjs/swagger';

export class UserLoginReq {
  @ApiProperty({
    description: 'Email of user',
    example: 'test@gmail.com'
  })
  email: string;
  
  @ApiProperty({
    description: 'Password of user',
    minLength: 8,
    example: 'test12345'
  })
  password: string;
}
