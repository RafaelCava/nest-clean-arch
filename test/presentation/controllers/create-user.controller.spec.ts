import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from 'src/presentation/controllers/create-user.controller';
import { DbCreateUser } from 'src/data/usecases/db-create-user';

describe('CreateUserController', () => {
  let controller: CreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [DbCreateUser],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
