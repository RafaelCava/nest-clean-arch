import { Inject, Injectable } from '@nestjs/common';
import { DeleteAvatarByUserIdRepository } from '../../infra/mongodb/repositories/delete-avatar-by-user-id-repository';
import { RemoveMedia } from '../../infra/medias/remove-media';
import { DeleteAvatar } from 'src/domain/usecases/delete-avatar';
import { LoadAvatarByUserIdRepository } from '../protocols';

@Injectable()
export class DbDeleteAvatar implements DeleteAvatar {
  constructor(
    private readonly deleteAvatarByUserIdRepository: DeleteAvatarByUserIdRepository,
    @Inject('LoadAvatarByUserIdRepository')
    private readonly loadAvatarByUserIdRepository: LoadAvatarByUserIdRepository,
    private readonly removeMedia: RemoveMedia,
  ) {}
  async deleteAvatar(userId: string): Promise<DeleteAvatar.Result> {
    const avatar = await this.loadAvatarByUserIdRepository.loadByUserId(userId);
    if (!avatar) {
      return { message: 'Avatar not found', error: true };
    }
    await this.deleteAvatarByUserIdRepository.deleteByUserId(userId);
    this.removeMedia.remove(avatar.hash);
    return { message: 'Avatar deleted', error: false };
  }
}
