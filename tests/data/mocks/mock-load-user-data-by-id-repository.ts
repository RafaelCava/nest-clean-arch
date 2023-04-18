import { mockExternalUser } from "../../domain/mocks"
import { LoadUserDataByIdRepository } from "../../../src/data/protocols"

export class LoadUserDataByIdRepositorySpy implements LoadUserDataByIdRepository {
  id: string
  async loadById (id: string): Promise<LoadUserDataByIdRepository.Result> {
    this.id = id
    return mockExternalUser()
  }
}