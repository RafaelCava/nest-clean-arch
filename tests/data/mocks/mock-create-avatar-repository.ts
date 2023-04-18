import { CreateAvatarRepository } from "../../../src/data/protocols";

export class CreateAvatarRepositorySpy implements CreateAvatarRepository {
  avatar?: CreateAvatarRepository.Params
  create(avatar: CreateAvatarRepository.Params): Promise<CreateAvatarRepository.Result> {
    this.avatar = avatar
    return
  }
}