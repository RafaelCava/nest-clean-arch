import { Avatar } from '../../domain/models/avatar';

export interface CreateAvatarRepository {
  create(
    avatar: CreateAvatarRepository.Params,
  ): Promise<CreateAvatarRepository.Result>;
}

export namespace CreateAvatarRepository {
  export type Params = Avatar;
  export type Result = void;
}
