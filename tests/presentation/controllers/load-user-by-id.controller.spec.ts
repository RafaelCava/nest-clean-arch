import { Test, TestingModule } from '@nestjs/testing';
import { LoadUserByIdController } from 'src/presentation/controllers/load-user-by-id.controller';
import { DbLoadUserById } from 'src/data/usecases/db-load-user-by-id';

describe('LoadUserByIdController', () => {
  let controller: LoadUserByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadUserByIdController],
      providers: [DbLoadUserById],
    }).compile();

    controller = module.get<LoadUserByIdController>(LoadUserByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
