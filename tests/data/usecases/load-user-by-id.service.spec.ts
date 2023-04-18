import { Test, TestingModule } from '@nestjs/testing';
import { DbLoadUserById } from '../../../src/data/usecases/db-load-user-by-id';
import { LoadUserDataByIdRepositorySpy } from '../mocks';

describe('LoadUserByIdService', () => {
  let service: DbLoadUserById;
  let loadUserDataByIdRepository: LoadUserDataByIdRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbLoadUserById,
        {
          provide: 'LoadUserDataByIdRepository',
          useClass: LoadUserDataByIdRepositorySpy,
        }
      ],
    }).compile();

    service = module.get<DbLoadUserById>(DbLoadUserById);
    loadUserDataByIdRepository = module.get<LoadUserDataByIdRepositorySpy>('LoadUserDataByIdRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(loadUserDataByIdRepository).toBeDefined();
  });
});
