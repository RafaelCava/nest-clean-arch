import { Test, TestingModule } from '@nestjs/testing';
import { DbCreateUser } from '../../../src/data/usecases/db-create-user';
import { CreateUserRepositorySpy, SendEventSpy } from '../mocks';

describe('DbCreateUser', () => {
  let service: DbCreateUser;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.create({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      avatar: 'any_avatar'
    })
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('name');
    expect(result.user).toHaveProperty('email');
    expect(result.user).toHaveProperty('password');
    expect(result.user).toHaveProperty('avatar');
  })
});
