import { HttpStatus, Injectable } from '@nestjs/common';
import async from 'async';
import { LogService } from '../../common/modules/logger/services';
import { TodoRepository } from '@repos/todo/todo.repository';
import { CreateTodoReq, CreateTodoRes } from '@modules/todos/models/create-todo.dto';
import { todoErrors } from '@modules/todos/todo.errors';
import { todoConstants } from '@modules/todos/todo.constants';
import { Todo } from '@repos/todo/todo.model';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository,
              private logService: LogService) {}
  createTodo(todo: CreateTodoReq, reqId: string): Promise<any> {
    let savedTodo: CreateTodoRes;
    return new Promise<any>((resolve, reject) => {
      async.waterfall([
        (saveTodo) => {
          this.todoRepository.save(this.todoRepository.constructTodoObject(todo, reqId), reqId).then((data: CreateTodoRes) => {
            savedTodo = data;
            saveTodo();
          }).catch((error) => {
            this.logService.error(reqId, `An error occurred creating todo. Error: ${JSON.stringify(error)}`);
            saveTodo({...todoErrors['3001'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
          })
        },
      ], (err) => {
        if (!err) {
          resolve(
            {
              ...todoConstants.responseMessages.todoCreated,
              ... { data: savedTodo }
            }
          );
        } else {
          reject(err);
        }
      });
    });
  }
  getTodos(reqId: string): Promise<any> {
    let fetchedTodos: CreateTodoRes[];
    return new Promise<any>((resolve, reject) => {
      async.waterfall([
        (fetchTodos) => {
          this.todoRepository.findAll({}, undefined, undefined, undefined, undefined, 0, [], [], reqId).then((data: Todo[]) => {
            fetchedTodos = data;
            fetchTodos();
          }).catch((error) => {
            this.logService.error(reqId, `An error occurred fetching todos. Error: ${(error)}`);
            fetchTodos({...todoErrors['3002'], ...{ statusCode: HttpStatus.INTERNAL_SERVER_ERROR } });
          })
        },
      ], (err) => {
        if (!err) {
          resolve(
            {
              ...todoConstants.responseMessages.todosFetched,
              ... { data: fetchedTodos }
            }
          );
        } else {
          reject(err);
        }
      });
    });
  }
}
