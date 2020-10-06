import { UserSchema } from '@repos/index';

export const entitiesConfig = {
  user: {
    name: 'User',
    provider: 'user_model_provider',
    schema: UserSchema
  },
};
