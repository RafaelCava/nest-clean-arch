export interface LoadUserDataByIdRepository {
  loadById(id: string): Promise<LoadUserDataByIdRepository.Result>;
}

export namespace LoadUserDataByIdRepository {
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
