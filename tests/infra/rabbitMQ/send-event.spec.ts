import { Test, TestingModule } from '@nestjs/testing';
import { SendEventRabbitMq } from '../../../src/infra/rabbitMQ/events/send-event.service';
import { RabbitMqServiceMock } from '../mocks';

describe('SendEventService', () => {
  let service: SendEventRabbitMq;
  let rabbitMqService: RabbitMqServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendEventRabbitMq,
        {
          provide: 'RABBITMQ_SERVICE',
          useClass: RabbitMqServiceMock,
        },
      ],
    }).compile();

    service = module.get<SendEventRabbitMq>(SendEventRabbitMq);
    rabbitMqService = module.get<RabbitMqServiceMock>('RABBITMQ_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(rabbitMqService).toBeDefined();
  });

  it('should call rabbitMqService.send with correct values', async () => {
    const sendSpy = jest.spyOn(rabbitMqService, 'send');
    const data = { name: 'rafael' };
    const options = { priority: 3 };
    await service.sendEvent(data);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(rabbitMqService.data).toEqual({
      data: JSON.stringify(data),
      options,
    });
  });
});
