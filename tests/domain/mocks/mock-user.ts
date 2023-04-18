import { User } from '../../../src/domain/models/user';

export const mockUser = (): User => ({
  avatar: 'any_avatar',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  id: 'any_id',
});
