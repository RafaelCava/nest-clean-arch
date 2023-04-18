import { Test, TestingModule } from '@nestjs/testing';
import { DbCreateUser } from '../../../src/data/usecases/db-create-user';
import { CreateUserRepositorySpy, SendEventSpy } from '../mocks';
import { mockCreateUserParams, throwError } from '../../domain/mocks';

describe('DbCreateUser', () => {
  let service: DbCreateUser;
  let sendEventSpy: SendEventSpy
  let createUserRepositorySpy: CreateUserRepositorySpy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbCreateUser,
        {
          provide: 'SendEvent',
          useClass: SendEventSpy,
        },
        {
          provide: 'CreateUserRepository',
          useClass: CreateUserRepositorySpy,
        },
      ],
    }).compile();
    service = module.get<DbCreateUser>(DbCreateUser);
    sendEventSpy = module.get<SendEventSpy>('SendEvent');
    createUserRepositorySpy = module.get<CreateUserRepositorySpy>('CreateUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call sendEvent with correct params', async () => {
    const sendEvent = jest.spyOn(sendEventSpy, 'sendEvent');
    const params = mockCreateUserParams()
    await service.create(params)
    expect(sendEvent).toHaveBeenCalledTimes(1)
    expect(sendEventSpy.params).toEqual(mockCreateUserParams())
  })

  it('should throws if sendEvent throws', async () => {
    jest.spyOn(sendEventSpy, 'sendEvent').mockImplementationOnce(throwError)
    const promise = service.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  it('should call createUserRepository with correct params', async () => {
    const createUserRepository = jest.spyOn(createUserRepositorySpy, 'create');
    const params = mockCreateUserParams()
    await service.create(params)
    expect(createUserRepository).toHaveBeenCalledTimes(1)
    expect(createUserRepositorySpy.params).toEqual(mockCreateUserParams())
  })

  it('should throws if createUserRepository throws', async () => {
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = service.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  it('should create and return an user', async () => {
    const params = mockCreateUserParams()
    const result = await service.create(params)
    expect(result.user).toHaveProperty('id');
    expect(result.user.avatar).toBe(params.avatar);
    expect(result.user.email).toBe(params.email);
    expect(result.user.name).toBe(params.name);
    expect(result.user.password).toBe(params.password);
  })
});
