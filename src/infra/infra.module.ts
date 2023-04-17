import { SendEventService } from './rabbitMQ/send-event/send-event.service';
import { Module } from '@nestjs/common';
import { databaseProviders, schemasProviders } from './mongodb/providers';
import { CreateUserRepository } from './mongodb/repositories/create-user-repository';
import { LoadAvatarByUserIdRepository } from './mongodb/repositories/load-avatar-by-user-id-repository';
import { CreateAvatarRepository } from './mongodb/repositories/create-avatar-repository';
import { TransformImageToBase64 } from './medias/transform-image-to-base64';
import { LoadUserDataByIdService } from './http/load-user-data-by-id.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeleteAvatarByUserIdRepository } from './mongodb/repositories/delete-avatar-by-user-id-repository';
import { RemoveMedia } from './medias/remove-media';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://reqres.in/api',
      timeout: 5000,
      maxRedirects: 5,
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@host.docker.internal:5672'],
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
    CreateUserRepository,
    LoadAvatarByUserIdRepository,
    CreateAvatarRepository,
    TransformImageToBase64,
    LoadUserDataByIdService,
    SendEventService,
    DeleteAvatarByUserIdRepository,
    RemoveMedia,
  ],
  exports: [
    ...databaseProviders,
    ...schemasProviders,
    CreateUserRepository,
    LoadAvatarByUserIdRepository,
    CreateAvatarRepository,
    TransformImageToBase64,
    LoadUserDataByIdService,
    SendEventService,
    DeleteAvatarByUserIdRepository,
    RemoveMedia,
  ],
})
export class InfraModule {}
