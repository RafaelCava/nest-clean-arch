import { User } from '../models/user';

export interface LoadUserById {
  loadById: (userId: string) => Promise<LoadUserById.Result>;
}

export namespace LoadUserById {
  export type Result = User;
}
