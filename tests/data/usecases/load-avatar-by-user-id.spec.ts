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
});
