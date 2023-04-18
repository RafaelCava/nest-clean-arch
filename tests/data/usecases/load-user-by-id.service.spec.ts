import { Test, TestingModule } from '@nestjs/testing';
import { DbLoadUserById } from '../../../src/data/usecases/db-load-user-by-id';
import { LoadUserDataByIdRepositorySpy } from '../mocks';
import { mockExternalUser, throwError } from '../../domain/mocks';

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

  it('should call LoadUserDataByIdRepository with correct values', async () => {
    const loadByIdSpy = jest.spyOn(loadUserDataByIdRepository, 'loadById');
    const userId = 'any_id'
    await service.loadById(userId);
    expect(loadByIdSpy).toHaveBeenCalledTimes(1);
    expect(loadUserDataByIdRepository.id).toBe(userId)
  })

  it('should throw if LoadUserDataByIdRepository throws', async () => {
    jest.spyOn(loadUserDataByIdRepository, 'loadById').mockImplementationOnce(throwError)
    const promise = service.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should return a user on success', async () => {
    const user = await service.loadById('any_id')
    expect(user).toEqual(mockExternalUser())
  })

  it('should return null if LoadUserDataByIdRepository returns null', async () => {
    jest.spyOn(loadUserDataByIdRepository, 'loadById').mockResolvedValueOnce(Promise.resolve(null))
    const user = await service.loadById('any_id')
    expect(user).toBeNull()
  })
});
