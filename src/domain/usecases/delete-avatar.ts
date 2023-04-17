export interface DeleteAvatar {
  deleteAvatar: (userId: string) => Promise<DeleteAvatar.Result>;
}

export namespace DeleteAvatar {
  export type Result = {
    message: string;
    error: boolean;
  };
}
