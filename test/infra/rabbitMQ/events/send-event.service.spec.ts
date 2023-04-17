import { Test, TestingModule } from '@nestjs/testing';
import { SendEventService } from '../../../../src/infra/rabbitMQ/events/send-event.service';

describe('SendEventService', () => {
  let service: SendEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendEventService],
    }).compile();

    service = module.get<SendEventService>(SendEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
