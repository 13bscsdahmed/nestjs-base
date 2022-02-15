import { IsEmail, IsNotEmpty, Length, IsIn } from 'class-validator';
import { userConstants } from '@modules/user/user.constants';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class CreateTodoReq {
  
  @ApiProperty({
    description: 'Description of todo',
    example: 'Sample todo'
  })
  @IsNotEmpty()
  description: string;
  
  @ApiProperty({
    description: 'Date of todo',
    example: 'sample-date'
  })
  @IsNotEmpty()
  date: string;
}

export class CreateTodoRes {
  @ApiResponseProperty({
    example: '5f61f7b30f1fe63b79678033'
  })
  _id: string;
  
  @ApiResponseProperty({
    example: 'Sample todo'
  })
  description: string;
  
  @ApiResponseProperty({
    example: 'sample-date'
  })
  date: string;
  
}
