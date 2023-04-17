import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService],
      imports: [RabbitmqModule],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return should return correct value', async () => {
    const body = { name: 'test' };
    const result = await service.create(body);
    expect(result).toEqual(body);
  });
});
