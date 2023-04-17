import { Avatar } from 'src/domain/models/avatar';

export interface LoadAvatarByUserIdRepository {
  loadByUserId(userId: string): Promise<LoadAvatarByUserIdRepository.Result>;
}

export namespace LoadAvatarByUserIdRepository {
  export type Result = Avatar;
}
