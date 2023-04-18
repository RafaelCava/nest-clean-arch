import { Test, TestingModule } from '@nestjs/testing';
import { SendEventRabbitMq } from '../../../../src/infra/rabbitMQ/events/send-event.service';

describe.skip('SendEventService', () => {
  let service: SendEventRabbitMq;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendEventRabbitMq],
    }).compile();

    service = module.get<SendEventRabbitMq>(SendEventRabbitMq);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
