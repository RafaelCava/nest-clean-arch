import { mockLoadAvatar } from '../../domain/mocks';
import { LoadAvatarByUserId } from '../../../src/domain/usecases';

export class LoadAvatarByUserIdSpy implements LoadAvatarByUserId {
  userId?: string;
  async loadAvatarByUserId(userId: string): Promise<LoadAvatarByUserId.Result> {
    this.userId = userId;
    return mockLoadAvatar();
  }
}
