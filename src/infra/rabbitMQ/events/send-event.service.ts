import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class SendEventService {
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
