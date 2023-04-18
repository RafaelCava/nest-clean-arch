import {
  mockCreateUserParams,
  mockCreateUserResult,
  throwError,
  throwException,
} from './../../domain/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '../../../src/presentation/controllers/create-user.controller';
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
      ],
    }).compile();

    sut = module.get<CreateUserController>(CreateUserController);
    createUserSpy = module.get<CreateUserSpy>('CreateUser');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(createUserSpy).toBeDefined();
  });

  it('should return a user on succeeds', async () => {
    const result = await sut.create(mockCreateUserParams());
    expect(result).toEqual(mockCreateUserResult());
    expect(result.user.avatar).toEqual(mockCreateUserResult().user.avatar);
  });

  it('should call CreateUser with correct params', async () => {
    const createSpy = jest.spyOn(createUserSpy, 'create');
    await sut.create(mockCreateUserParams());
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createUserSpy.body).toEqual(mockCreateUserParams());
  });

  it('should throws HttpExpception if CreateUser throws', async () => {
    jest.spyOn(createUserSpy, 'create').mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateUserParams());
    await expect(promise).rejects.toThrow(throwException());
  });
});
