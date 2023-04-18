import { mockDeleteAvatarResult } from '../../domain/mocks';
import { DeleteAvatar } from '../../../src/domain/usecases';

export class DeleteAvatarSpy implements DeleteAvatar {
  userId?: string;
  async deleteAvatar(userId: string): Promise<DeleteAvatar.Result> {
    this.userId = userId;
    return mockDeleteAvatarResult();
  }
}
