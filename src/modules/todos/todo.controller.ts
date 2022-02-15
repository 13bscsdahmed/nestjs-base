import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CreateUserRes } from '@modules/user/models/create-user-dto';
import { ResponseObj } from '../../common/modules/shared/interceptors/response.interceptor';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../common/modules/shared/decorators/roles.decorator';
import { userConstants } from '@modules/user/user.constants';
import { RolesGuard } from '../../common/modules/shared/guards/roles.guard';
import { TodoService } from '@modules/todos/todo.service';
import { CreateTodoReq, CreateTodoRes } from '@modules/todos/models/create-todo.dto';
import { GetTodosRes } from '@modules/todos/models/get-todos.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  
  @Post()
  @ApiResponse({ status: 201, type: CreateUserRes, description: 'Creates new todo object.' })
  async createTodo(@Body() todo: CreateTodoReq, @Req() req: Request): Promise<ResponseObj<CreateTodoRes>> {
    try {
      return await this.todoService.createTodo(todo, req.reqId);
    } catch (error) {
      return error
    }
  }
  
  @Get()
  @ApiResponse({ status: 200, type: GetTodosRes, description: 'Fetches todos.' })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(userConstants.userTypes.user, userConstants.userTypes.admin)
  async getTodos(@Req() req: Request): Promise<ResponseObj<GetTodosRes[]>> {
    try {
      return await this.todoService.getTodos(req.reqId);
    } catch (error) {
      return error
    }
  }
}
