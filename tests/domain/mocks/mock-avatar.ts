import { Avatar } from 'src/domain/models/avatar';
import { LoadAvatarByUserId } from '../../../src/domain/usecases';

export const mockLoadAvatar = (): LoadAvatarByUserId.Result => ({
  avatar: 'any_avatar',
});

export const mockAvatar = (): Avatar => ({
  base64: 'any_base64',
  hash: 'any_hash',
  user: 'any_user_id',
});
