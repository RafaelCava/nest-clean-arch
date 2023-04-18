import { Test, TestingModule } from '@nestjs/testing';
import { DbDeleteAvatar } from '../../../src/data/usecases/db-delete-avatar';
import { DeleteAvatarByUserIdRepositorySpy, LoadAvatarByUserIdRepositorySpy, RemoveMediaSpy } from '../mocks';
import { throwError } from '../../domain/mocks';

describe('DeleteAvatarService', () => {
  let service: DbDeleteAvatar;
  let deleteAvatarByUserIdRepositorySpy: DeleteAvatarByUserIdRepositorySpy
  let loadAvatarByUserIdRepositorySpy: LoadAvatarByUserIdRepositorySpy
  let removeMediaSpy: RemoveMediaSpy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbDeleteAvatar,
        {
          provide: 'DeleteAvatarByUserIdRepository',
          useClass: DeleteAvatarByUserIdRepositorySpy,
        },
        {
          provide: 'LoadAvatarByUserIdRepository',
          useClass: LoadAvatarByUserIdRepositorySpy,
        },
        {
          provide: 'RemoveMedia',
          useClass: RemoveMediaSpy,
        },
      ],
    }).compile();

    service = module.get<DbDeleteAvatar>(DbDeleteAvatar);
    deleteAvatarByUserIdRepositorySpy = module.get<DeleteAvatarByUserIdRepositorySpy>('DeleteAvatarByUserIdRepository')
    loadAvatarByUserIdRepositorySpy = module.get<LoadAvatarByUserIdRepositorySpy>('LoadAvatarByUserIdRepository')
    removeMediaSpy = module.get<RemoveMediaSpy>('RemoveMedia')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(deleteAvatarByUserIdRepositorySpy).toBeDefined();
    expect(loadAvatarByUserIdRepositorySpy).toBeDefined();
    expect(removeMediaSpy).toBeDefined();
  });

  it('should call loadAvatarByUserIdRepository with correct params', async () => {
    const loadByUserId = jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId');
    await service.deleteAvatar('any_id')
    expect(loadByUserId).toHaveBeenCalledTimes(1)
    expect(loadByUserId).toHaveBeenCalledWith('any_id')
  })

  it('should return { message: "Avatar not found", error: true } if loadAvatarByUserIdRepository returns null', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockReturnValueOnce(null)
    const result = await service.deleteAvatar('any_id')
    expect(result).toEqual({ message: 'Avatar not found', error: true })
  })

  it('should throws if loadAvatarByUserIdRepository throws', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockImplementationOnce(throwError)
    const promise = service.deleteAvatar('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should call removeMedia with correct params', async () => {
    const remove = jest.spyOn(removeMediaSpy, 'remove');
    await service.deleteAvatar('any_id')
    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith('any_hash')
  })

  it('should throws if removeMedia throws', async () => {
    jest.spyOn(removeMediaSpy, 'remove').mockImplementationOnce(throwError)
    const promise = service.deleteAvatar('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should call deleteAvatarByUserIdRepository with correct params', async () => {
    const deleteByUserId = jest.spyOn(deleteAvatarByUserIdRepositorySpy, 'deleteByUserId');
    await service.deleteAvatar('any_id')
    expect(deleteByUserId).toHaveBeenCalledTimes(1)
    expect(deleteByUserId).toHaveBeenCalledWith('any_id')
  })

  it('should throws if deleteAvatarByUserIdRepository throws', async () => {
    jest.spyOn(deleteAvatarByUserIdRepositorySpy, 'deleteByUserId').mockImplementationOnce(throwError)
    const promise = service.deleteAvatar('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should return { message: "Avatar deleted", error: false } on success', async () => {
    const result = await service.deleteAvatar('any_id')
    expect(result).toEqual({ message: 'Avatar deleted', error: false })
  })
});
