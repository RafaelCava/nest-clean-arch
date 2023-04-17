import { Inject, Injectable } from '@nestjs/common';
import { TransformImageToBase64 } from '../../infra/medias/transform-image-to-base64';
import { LoadAvatarByUserId } from '../../domain/usecases/load-avatar-by-user-id';
import {
  CreateAvatarRepository,
  LoadAvatarByUserIdRepository,
  LoadUserDataByIdRepository,
} from '../protocols';

@Injectable()
export class DbLoadAvatarByUserId implements LoadAvatarByUserId {
  constructor(
    @Inject('LoadAvatarByUserIdRepository')
    private readonly loadAvatarByUserIdRepository: LoadAvatarByUserIdRepository,
    @Inject('LoadUserDataByIdRepository')
    private readonly loadUserDataByIdRepository: LoadUserDataByIdRepository,
    @Inject('CreateAvatarRepository')
    private readonly createAvatarRepository: CreateAvatarRepository,
    private readonly transformImageToBase64: TransformImageToBase64,
  ) {}
  async loadAvatarByUserId(userId: string): Promise<LoadAvatarByUserId.Result> {
    const avatar = await this.loadAvatarByUserIdRepository.loadByUserId(userId);
    if (avatar) {
      return {
        avatar: avatar.base64,
      };
    }
    const userData = await this.loadUserDataByIdRepository.loadById(userId);
    const { imgBase64, hash } = await this.transformImageToBase64.transform(
      userData.data.avatar,
      userId,
    );
    await this.createAvatarRepository.create({
      base64: imgBase64,
      user: userId,
      hash,
    });
    return {
      avatar: imgBase64,
    };
  }
}
