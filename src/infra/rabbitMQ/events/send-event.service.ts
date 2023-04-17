import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { SendEvent } from 'src/data/protocols';

@Injectable()
export class SendEventRabbitMq implements SendEvent {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendEvent(data: any) {
    const message = JSON.stringify(data);
    const record = new RmqRecordBuilder(message)
      .setOptions({
        priority: 3,
      })
      .build();
    this.client.send('send-event', record).subscribe();
  }
}
