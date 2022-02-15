import { Module } from '@nestjs/common';
import { TodoController } from '@modules/todos/todo.controller';
import { TodoService } from '@modules/todos/todo.service';

@Module({
  controllers: [ TodoController ],
  providers: [ TodoService ]
})
export class TodoModule {}
