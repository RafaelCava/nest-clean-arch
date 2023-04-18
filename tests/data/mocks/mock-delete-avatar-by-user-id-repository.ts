import { DeleteAvatarByUserIdRepository } from "../../../src/data/protocols";

export class DeleteAvatarByUserIdRepositorySpy implements DeleteAvatarByUserIdRepository {
  userId?: string
  deleteByUserId(userId: string): Promise<void> {
    this.userId = userId
    return Promise.resolve()
  }
}