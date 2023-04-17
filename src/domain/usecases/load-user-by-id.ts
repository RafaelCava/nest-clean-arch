export interface LoadUserById {
  loadById: (userId: string) => Promise<LoadUserById.Result>;
}

export namespace LoadUserById {
  export type Result = {
    data: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    };
  };
}
