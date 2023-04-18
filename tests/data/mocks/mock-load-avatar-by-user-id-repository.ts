import { LoadAvatarByUserIdRepository } from "../../../src/data/protocols"
import { mockAvatar } from "../../domain/mocks"

export class LoadAvatarByUserIdRepositorySpy implements LoadAvatarByUserIdRepository {
  userId?: string
  loadByUserId(userId: string): Promise<LoadAvatarByUserIdRepository.Result> {
    this.userId = userId
    return Promise.resolve(mockAvatar())
  }

}