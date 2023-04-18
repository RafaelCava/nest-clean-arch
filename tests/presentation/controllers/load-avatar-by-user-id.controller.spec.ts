import { Test, TestingModule } from '@nestjs/testing';
import { LoadAvatarByUserIdController } from '../../../src/presentation/controllers/load-avatar-by-user-id.controller';
import { LoadAvatarByUserIdSpy } from '../mocks';

describe('LoadAvatarByUserIdController', () => {
  let controller: LoadAvatarByUserIdController;
  let loadAvatarByUserIdSpy: LoadAvatarByUserIdSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadAvatarByUserIdController],
      providers: [
        {
          provide: 'LoadAvatarByUserId',
          useClass: LoadAvatarByUserIdSpy,
        },
      ],
    }).compile();

    controller = module.get<LoadAvatarByUserIdController>(
      LoadAvatarByUserIdController,
    );
    loadAvatarByUserIdSpy =
      module.get<LoadAvatarByUserIdSpy>('LoadAvatarByUserId');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(loadAvatarByUserIdSpy).toBeDefined();
  });

  it('should call LoadAvatarByUserId with correct value', async () => {
    const loadSpy = jest.spyOn(loadAvatarByUserIdSpy, 'load');
    const userId = 'any_user_id';
    await controller.load(userId);
    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(loadAvatarByUserIdSpy.userId).toBe(userId);
  });
});
