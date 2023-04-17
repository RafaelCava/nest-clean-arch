import { Module } from '@nestjs/common';
import {
  DbCreateUser,
  DbDeleteAvatar,
  DbLoadAvatarByUserId,
  DbLoadUserById,
} from './usecases';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: 'CreateUser',
      useClass: DbCreateUser,
    },
    {
      provide: 'DeleteAvatar',
      useClass: DbDeleteAvatar,
    },
    {
      provide: 'LoadAvatarByUserId',
      useClass: DbLoadAvatarByUserId,
    },
    {
      provide: 'LoadUserById',
      useClass: DbLoadUserById,
    },
  ],
  exports: [
    {
      provide: 'CreateUser',
      useClass: DbCreateUser,
    },
    {
      provide: 'DeleteAvatar',
      useClass: DbDeleteAvatar,
    },
    {
      provide: 'LoadAvatarByUserId',
      useClass: DbLoadAvatarByUserId,
    },
    {
      provide: 'LoadUserById',
      useClass: DbLoadUserById,
    },
  ],
})
export class DataModule {}
