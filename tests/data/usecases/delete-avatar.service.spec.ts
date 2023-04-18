import { Test, TestingModule } from '@nestjs/testing';
import { DbDeleteAvatar } from '../../../src/data/usecases/db-delete-avatar';

describe.skip('DeleteAvatarService', () => {
  let service: DbDeleteAvatar;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbDeleteAvatar],
    }).compile();

    service = module.get<DbDeleteAvatar>(DbDeleteAvatar);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
