import { Inject, Injectable } from '@nestjs/common';
import { LoadUserDataByIdService } from '../../infra/http/load-user-data-by-id.service';
import { CreateAvatarRepository } from '../../infra/mongodb/repositories/create-avatar-repository';
import { TransformImageToBase64 } from '../../infra/medias/transform-image-to-base64';
import { LoadAvatarByUserId } from 'src/domain/usecases/load-avatar-by-user-id';
import { LoadAvatarByUserIdRepository } from '../protocols';

@Injectable()
export class DbLoadAvatarByUserId implements LoadAvatarByUserId {
  constructor(
    @Inject('LoadAvatarByUserIdRepository')
    private readonly loadAvatarByUserIdRepository: LoadAvatarByUserIdRepository,
    private readonly loadUserDataByIdService: LoadUserDataByIdService,
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
    const userData = await this.loadUserDataByIdService.loadById(userId);
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
