import { User } from '../models/user';

/* eslint-disable @typescript-eslint/no-namespace */
export interface CreateUser {
  create(body: CreateUser.Params): Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = User;
  export type Result = User;
}
