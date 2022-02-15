import { ApiResponseProperty } from '@nestjs/swagger';

export class GetTodosRes {
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