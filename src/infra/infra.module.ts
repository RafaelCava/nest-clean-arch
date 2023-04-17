import { SendEventRabbitMq } from './rabbitMQ/events/send-event.service';
import { Module } from '@nestjs/common';
import { databaseProviders, schemasProviders } from './mongodb/providers';
import { CreateUserMongoRepository } from './mongodb/repositories/create-user-repository';
import { LoadAvatarByUserIdMongoRepository } from './mongodb/repositories/load-avatar-by-user-id-mongo-repository';
import { CreateAvatarMongoRepository } from './mongodb/repositories/create-avatar-repository';
import { MediaTransformImageToBase64 } from './medias/transform-image-to-base64';
import { LoadUserDataByIdHttp } from './http/load-user-data-by-id.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeleteAvatarByUserIdMongoRepository } from './mongodb/repositories/delete-avatar-by-user-id-repository';
import { RemoveMediaFileSystem } from './medias/remove-media';

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
    {
      provide: 'CreateAvatarRepository',
      useClass: CreateAvatarMongoRepository,
    },
    {
      provide: 'DeleteAvatarByUserIdRepository',
      useClass: DeleteAvatarByUserIdMongoRepository,
    },
    {
      provide: 'LoadUserDataByIdRepository',
      useClass: LoadUserDataByIdHttp,
    },
    {
      provide: 'TransformImageToBase64',
      useClass: MediaTransformImageToBase64,
    },
    {
      provide: 'RemoveMedia',
      useClass: RemoveMediaFileSystem,
    },
    {
      provide: 'SendEvent',
      useClass: SendEventRabbitMq,
    },
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
    {
      provide: 'CreateAvatarRepository',
      useClass: CreateAvatarMongoRepository,
    },
    {
      provide: 'DeleteAvatarByUserIdRepository',
      useClass: DeleteAvatarByUserIdMongoRepository,
    },
    {
      provide: 'LoadUserDataByIdRepository',
      useClass: LoadUserDataByIdHttp,
    },
    {
      provide: 'TransformImageToBase64',
      useClass: MediaTransformImageToBase64,
    },
    {
      provide: 'RemoveMedia',
      useClass: RemoveMediaFileSystem,
    },
    {
      provide: 'SendEvent',
      useClass: SendEventRabbitMq,
    },
  ],
})
export class InfraModule {}
