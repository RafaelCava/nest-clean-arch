import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAvatarController } from '../../../src/presentation/controllers/delete-avatar.controller';

describe('DeleteAvatarController', () => {
  let controller: DeleteAvatarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAvatarController],
      providers: [
        {
          provide: 'DeleteAvatar',
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteAvatarController>(DeleteAvatarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
