import { LoadAvatarByUserId } from '../../../src/domain/usecases';

export const mockLoadAvatar = (): LoadAvatarByUserId.Result => ({
  avatar: 'any_avatar',
});
