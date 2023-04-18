import { Test, TestingModule } from '@nestjs/testing';
import { LoadAvatarByUserIdController } from '../../../src/presentation/controllers/load-avatar-by-user-id.controller';

describe.skip('LoadAvatarByUserIdController', () => {
  let controller: LoadAvatarByUserIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadAvatarByUserIdController],
    }).compile();

    controller = module.get<LoadAvatarByUserIdController>(
      LoadAvatarByUserIdController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
