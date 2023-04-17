export interface DeleteAvatarByUserIdRepository {
  deleteByUserId(
    userId: string,
  ): Promise<DeleteAvatarByUserIdRepository.Result>;
}

export namespace DeleteAvatarByUserIdRepository {
  export type Result = void;
}
