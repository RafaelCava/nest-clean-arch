import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAvatarController } from '../../../src/presentation/controllers/delete-avatar.controller';
import { DbDeleteAvatar } from '../../../src/data/usecases/db-delete-avatar';

describe.skip('DeleteAvatarController', () => {
  let controller: DeleteAvatarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAvatarController],
      providers: [DbDeleteAvatar],
    }).compile();

    controller = module.get<DeleteAvatarController>(DeleteAvatarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
