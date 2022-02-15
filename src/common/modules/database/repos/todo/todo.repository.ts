import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { entitiesConfig } from '../../entities-config/config';
import { Model } from 'mongoose';
import { Todo } from '@repos/todo/todo.model';
import { CreateTodoReq } from '@modules/todos/models/create-todo.dto';

@Injectable()
export class TodoRepository extends BaseRepository {
  constructor(@Inject(entitiesConfig.todo.provider) private TodoModel: Model<Todo>){
    super(TodoModel, 'Todo');
  }
  
  constructTodoObject(todo: CreateTodoReq, reqId: string): Todo {
    return new this.TodoModel({
      description: todo.description,
      date: todo.date,
    });
  };
}
