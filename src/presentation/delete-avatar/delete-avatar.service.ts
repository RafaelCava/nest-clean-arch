import { Inject, Injectable } from '@nestjs/common';
import { DeleteAvatarByUserIdRepository } from '../../infra/mongodb/repositories/delete-avatar-by-user-id-repository';
import { RemoveMedia } from '../../infra/medias/remove-media';
import { LoadAvatarByUserIdRepository } from '../../data/protocols';

@Injectable()
export class DeleteAvatarService {
  constructor(
    private readonly deleteAvatarByUserIdRepository: DeleteAvatarByUserIdRepository,
    @Inject('LoadAvatarByUserIdRepository')
    private readonly loadAvatarByUserIdRepository: LoadAvatarByUserIdRepository,
    private readonly removeMedia: RemoveMedia,
  ) {}
  async deleteAvatar(userId: string) {
    const avatar = await this.loadAvatarByUserIdRepository.loadByUserId(userId);
    if (!avatar) {
      return { message: 'Avatar not found', error: true };
    }
    await this.deleteAvatarByUserIdRepository.deleteByUserId(userId);
    this.removeMedia.remove(avatar.hash);
    return { message: 'Avatar deleted', error: false };
  }
}
