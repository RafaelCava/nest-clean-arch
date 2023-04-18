import { DeleteAvatar } from 'src/domain/usecases';

export const mockDeleteAvatarResult = (): DeleteAvatar.Result => ({
  error: false,
  message: 'Avatar deleted',
});
