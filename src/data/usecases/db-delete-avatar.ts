import { Inject, Injectable } from '@nestjs/common';
import { DeleteAvatar } from '../../domain/usecases';
import {
  DeleteAvatarByUserIdRepository,
  LoadAvatarByUserIdRepository,
  RemoveMedia,
} from '../protocols';

@Injectable()
export class DbDeleteAvatar implements DeleteAvatar {
  constructor(
    @Inject('DeleteAvatarByUserIdRepository')
    private readonly deleteAvatarByUserIdRepository: DeleteAvatarByUserIdRepository,
    @Inject('LoadAvatarByUserIdRepository')
    private readonly loadAvatarByUserIdRepository: LoadAvatarByUserIdRepository,
    @Inject('RemoveMedia')
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
