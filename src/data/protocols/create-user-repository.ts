import { User } from 'src/domain/models/user';

export interface CreateUserRepository {
  create(
    user: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Params = Partial<User>;
  export type Result = User;
}
