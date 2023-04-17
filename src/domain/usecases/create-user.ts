import { User } from '../models/user';

export interface CreateUser {
  create(body: CreateUser.Params): Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = Omit<User, 'id'>;
  export type Result = {
    user: User;
  };
}
