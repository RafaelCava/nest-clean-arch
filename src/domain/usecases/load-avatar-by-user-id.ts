export interface LoadAvatarByUserId {
  load: (userId: string) => Promise<LoadAvatarByUserId.Result>;
}

export namespace LoadAvatarByUserId {
  export type Result = Avatar;

  type Avatar = {
    avatar: string;
  };
}
