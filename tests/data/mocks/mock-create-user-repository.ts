import { mockUser } from "../../domain/mocks";
import { CreateUserRepository } from "../../../src/data/protocols";

export class CreateUserRepositorySpy implements CreateUserRepository {
  params: CreateUserRepository.Params;

  async create(data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    this.params = data;
    return mockUser();
  }
}