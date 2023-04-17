import { SendEventService } from './rabbitMQ/events/send-event.service';
import { Module } from '@nestjs/common';
import { databaseProviders, schemasProviders } from './mongodb/providers';
import { CreateUserMongoRepository } from './mongodb/repositories/create-user-repository';
import { LoadAvatarByUserIdMongoRepository } from './mongodb/repositories/load-avatar-by-user-id-mongo-repository';
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
    {
      provide: 'CreateUserRepository',
      useClass: CreateUserMongoRepository,
    },
    {
      provide: 'LoadAvatarByUserIdRepository',
      useClass: LoadAvatarByUserIdMongoRepository,
    },
    LoadAvatarByUserIdMongoRepository,
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
    {
      provide: 'CreateUserRepository',
      useClass: CreateUserMongoRepository,
    },
    {
      provide: 'LoadAvatarByUserIdRepository',
      useClass: LoadAvatarByUserIdMongoRepository,
    },
    LoadAvatarByUserIdMongoRepository,
    CreateAvatarRepository,
    TransformImageToBase64,
    LoadUserDataByIdService,
    SendEventService,
    DeleteAvatarByUserIdRepository,
    RemoveMedia,
  ],
})
export class InfraModule {}
