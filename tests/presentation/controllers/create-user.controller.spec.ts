import {
  mockCreateUserParams,
  mockCreateUserResult,
} from './../../domain/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '../../../src/presentation/controllers/create-user.controller';
import { DbCreateUser } from '../../../src/data/usecases';
import { InfraModule } from '../../../src/infra/infra.module';
import { CreateUserSpy } from '../mocks';

describe('CreateUserController', () => {
  let sut: CreateUserController;
  let createUserSpy: CreateUserSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: 'CreateUser',
          useClass: CreateUserSpy,
        },
        DbCreateUser,
      ],
      imports: [InfraModule],
    }).compile();

    sut = module.get<CreateUserController>(CreateUserController);
    createUserSpy = module.get<CreateUserSpy>('CreateUser');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(createUserSpy).toBeDefined();
  });

  it('should return a user on succeeds', async () => {
    const params = mockCreateUserParams();
    const result = await sut.create(params);
    expect(result).toEqual(mockCreateUserResult());
    expect(result.user.avatar).toEqual(mockCreateUserResult().user.avatar);
  });

  it('should call CreateUser with correct params', async () => {
    const createSpy = jest.spyOn(createUserSpy, 'create');
    const params = mockCreateUserParams();
    await sut.create(params);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createUserSpy.body).toEqual(mockCreateUserParams());
  });
});
