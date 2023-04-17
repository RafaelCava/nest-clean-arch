import { SendEventRabbitMq } from './rabbitMQ/events/send-event.service';
import { Module } from '@nestjs/common';
import {
  databaseProviders,
  schemasProviders,
  repositoriesProviders,
} from './mongodb/providers';
import { LoadUserDataByIdHttp } from './http/load-user-data-by-id.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { mediasProviders } from './medias/medias.provider';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.BASE_API,
      timeout: 5000,
      maxRedirects: 5,
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    ...databaseProviders,
    ...schemasProviders,
    ...repositoriesProviders,
    ...mediasProviders,
    {
      provide: 'LoadUserDataByIdRepository',
      useClass: LoadUserDataByIdHttp,
    },
    {
      provide: 'SendEvent',
      useClass: SendEventRabbitMq,
    },
  ],
  exports: [
    ...databaseProviders,
    ...schemasProviders,
    ...repositoriesProviders,
    ...mediasProviders,
    {
      provide: 'LoadUserDataByIdRepository',
      useClass: LoadUserDataByIdHttp,
    },
    {
      provide: 'SendEvent',
      useClass: SendEventRabbitMq,
    },
  ],
})
export class InfraModule {}
