import { UserSchema } from '@repos/index';
import { TodoSchema } from '@repos/todo/todo.model';

export const entitiesConfig = {
  user: {
    name: 'User',
    provider: 'user_model_provider',
    schema: UserSchema
  },
  todo: {
    name: 'Todo',
    provider: 'todo_model_provider',
    schema: TodoSchema
  },
};
