import { Test, TestingModule } from '@nestjs/testing';
import { DbLoadUserById } from '../../../src/data/usecases/db-load-user-by-id';

describe.skip('LoadUserByIdService', () => {
  let service: DbLoadUserById;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbLoadUserById],
    }).compile();

    service = module.get<DbLoadUserById>(DbLoadUserById);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
