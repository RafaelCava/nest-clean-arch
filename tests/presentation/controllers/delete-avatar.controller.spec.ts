import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAvatarController } from '../../../src/presentation/controllers/delete-avatar.controller';
import { DeleteAvatarSpy } from '../mocks';
import {
  mockDeleteAvatarResult,
  throwError,
  throwException,
} from '../../domain/mocks';

describe('DeleteAvatarController', () => {
  let controller: DeleteAvatarController;
  let deleteAvatarSpy: DeleteAvatarSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAvatarController],
      providers: [
        {
          provide: 'DeleteAvatar',
          useClass: DeleteAvatarSpy,
        },
      ],
    }).compile();

    controller = module.get<DeleteAvatarController>(DeleteAvatarController);
    deleteAvatarSpy = module.get<DeleteAvatarSpy>('DeleteAvatar');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DeleteAvatar with correct value', async () => {
    const deleteSpy = jest.spyOn(deleteAvatarSpy, 'deleteAvatar');
    await controller.delete('any_id');
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteAvatarSpy.userId).toBe('any_id');
  });

  it('should throw HttpException if DeleteAvatar throws', async () => {
    jest
      .spyOn(deleteAvatarSpy, 'deleteAvatar')
      .mockImplementationOnce(throwError);
    const promise = controller.delete('any_id');
    await expect(promise).rejects.toThrow(throwException());
  });

  it('should throw HttpException if DeleteAvatar returns error', async () => {
    jest
      .spyOn(deleteAvatarSpy, 'deleteAvatar')
      .mockResolvedValueOnce(
        Promise.resolve({ error: true, message: 'error' }),
      );
    const promise = controller.delete('any_id');
    await expect(promise).rejects.toThrow(throwException());
  });

  it('should return a message on success', async () => {
    const result = await controller.delete('any_id');
    expect(result).toEqual({ message: mockDeleteAvatarResult().message });
  });
});
