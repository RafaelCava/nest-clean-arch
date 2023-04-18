import { Test, TestingModule } from '@nestjs/testing';
import { DbLoadAvatarByUserId } from '../../../src/data/usecases/db-load-avatar-by-user-id';
import { LoadAvatarByUserIdRepositorySpy, LoadUserDataByIdRepositorySpy, TransformImageToBase64Spy } from '../mocks';
import { CreateAvatarRepository } from '../../../src/data/protocols';

class CreateAvatarRepositorySpy implements CreateAvatarRepository {
  avatar?: CreateAvatarRepository.Params
  create(avatar: CreateAvatarRepository.Params): Promise<CreateAvatarRepository.Result> {
    this.avatar = avatar
    return
  }
}

describe('LoadAvatarByUserId', () => {
  let provider: DbLoadAvatarByUserId;
  let loadAvatarByUserIdRepositorySpy: LoadAvatarByUserIdRepositorySpy
  let loadUserDataByIdRepositorySpy: LoadUserDataByIdRepositorySpy
  let transformImageToBase64Spy: TransformImageToBase64Spy
  let createAvatarRepositorySpy: CreateAvatarRepositorySpy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbLoadAvatarByUserId,
        {
          provide: 'LoadAvatarByUserIdRepository',
          useClass: LoadAvatarByUserIdRepositorySpy
        },
        {
          provide: 'LoadUserDataByIdRepository',
          useClass: LoadUserDataByIdRepositorySpy,
        },
        {
          provide: 'CreateAvatarRepository',
          useClass: CreateAvatarRepositorySpy,
        },
        {
          provide: 'TransformImageToBase64',
          useClass: TransformImageToBase64Spy,
        },
      ],
    }).compile();

    provider = module.get<DbLoadAvatarByUserId>(DbLoadAvatarByUserId);
    loadAvatarByUserIdRepositorySpy = module.get<LoadAvatarByUserIdRepositorySpy>('LoadAvatarByUserIdRepository');
    loadUserDataByIdRepositorySpy = module.get<LoadUserDataByIdRepositorySpy>('LoadUserDataByIdRepository');
    transformImageToBase64Spy = module.get<TransformImageToBase64Spy>('TransformImageToBase64');
    createAvatarRepositorySpy = module.get<CreateAvatarRepositorySpy>('CreateAvatarRepository');
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(loadAvatarByUserIdRepositorySpy).toBeDefined();
    expect(loadUserDataByIdRepositorySpy).toBeDefined();
    expect(transformImageToBase64Spy).toBeDefined();
    expect(createAvatarRepositorySpy).toBeDefined();
  });

  it('should call LoadAvatarByUserIdRepository with correct values', async () => {
    const loadByUserIdSpy = jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId')
    const userId = 'any_id'
    await provider.load(userId)
    expect(loadAvatarByUserIdRepositorySpy.userId).toBe(userId)
    expect(loadByUserIdSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if LoadAvatarByUserIdRepository throws', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockRejectedValueOnce(new Error())
    const promise = provider.load('any_id')
    await expect(promise).rejects.toThrow()
  })
  
  it('should call LoadUserDataByIdRepository with correct values', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    const loadByIdSpy = jest.spyOn(loadUserDataByIdRepositorySpy, 'loadById')
    const userId = 'any_id'
    await provider.load(userId)
    expect(loadUserDataByIdRepositorySpy.id).toBe(userId)
    expect(loadByIdSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if LoadUserDataByIdRepository throws', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    jest.spyOn(loadUserDataByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = provider.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should call TransformImageToBase64 with correct values', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    const transformSpy = jest.spyOn(transformImageToBase64Spy, 'transform')
    const userId = 'any_id'
    await provider.load(userId)
    expect(transformImageToBase64Spy.url).toBe('any_avatar')
    expect(transformImageToBase64Spy.hasher).toBe(userId)
    expect(transformSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if TransformImageToBase64 throws', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    jest.spyOn(transformImageToBase64Spy, 'transform').mockRejectedValueOnce(new Error())
    const promise = provider.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should call CreateAvatarRepository with correct values', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    const createSpy = jest.spyOn(createAvatarRepositorySpy, 'create')
    const userId = 'any_id'
    await provider.load(userId)
    expect(createAvatarRepositorySpy.avatar).toEqual({
      base64: 'any_base64',
      hash: 'any_hash',
      user: userId,
    })
    expect(createSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if CreateAvatarRepository throws', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    jest.spyOn(createAvatarRepositorySpy, 'create').mockRejectedValueOnce(new Error())
    const promise = provider.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should base64 if LoadAvatarByUserIdRepository returns an avatar', async () => {
    const base64 = await provider.load('any_id')
    expect(base64.avatar).toBe('any_base64')
  })

  it('should base64 if LoadAvatarByUserIdRepository returns null', async () => {
    jest.spyOn(loadAvatarByUserIdRepositorySpy, 'loadByUserId').mockResolvedValueOnce(Promise.resolve(null))
    const base64 = await provider.load('any_id')
    expect(base64.avatar).toBe('any_base64')
  })
});
