import { Test, TestingModule } from '@nestjs/testing';
import { LoadUserByIdController } from '../../../src/presentation/controllers/load-user-by-id.controller';
import { LoadUserByIdSpy } from '../mocks';
import { throwError, throwException } from '../../domain/mocks';

describe('LoadUserByIdController', () => {
  let sut: LoadUserByIdController;
  let loadUserByIdSpy: LoadUserByIdSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadUserByIdController],
      providers: [
        {
          provide: 'LoadUserById',
          useClass: LoadUserByIdSpy,
        },
      ],
    }).compile();

    sut = module.get<LoadUserByIdController>(LoadUserByIdController);
    loadUserByIdSpy = module.get<LoadUserByIdSpy>('LoadUserById');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(loadUserByIdSpy).toBeDefined();
  });

  it('should call LoadUserById with correct value', async () => {
    const loadByIsSpy = jest.spyOn(loadUserByIdSpy, 'loadById');
    const userId = 'any_id';
    await sut.loadById(userId);
    expect(loadUserByIdSpy.userId).toBe(userId);
    expect(loadByIsSpy).toHaveBeenCalledTimes(1);
  });

  it('should throws if LoadUserById throws', async () => {
    jest.spyOn(loadUserByIdSpy, 'loadById').mockImplementationOnce(throwError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow(throwException());
  });
});
