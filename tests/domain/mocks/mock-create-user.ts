import { CreateUser } from '../../../src/domain/usecases';

export const mockCreateUserParams = (): CreateUser.Params => ({
  avatar: 'any_avatar',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});
export const mockCreateUserResult = (): CreateUser.Result => ({
  user: {
    avatar: 'any_avatar',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    id: 'any_id',
  },
});
