import { User } from '../models/user';

export interface CreateUser {
  create(body: CreateUser.Params): Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = User;
  export type Result = {
    user: User;
  };
}
