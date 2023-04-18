import { Test, TestingModule } from '@nestjs/testing';
import { DbLoadAvatarByUserId } from '../../../src/data/usecases/db-load-avatar-by-user-id';

describe.skip('LoadAvatarByUserId', () => {
  let provider: DbLoadAvatarByUserId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbLoadAvatarByUserId],
    }).compile();

    provider = module.get<DbLoadAvatarByUserId>(DbLoadAvatarByUserId);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
