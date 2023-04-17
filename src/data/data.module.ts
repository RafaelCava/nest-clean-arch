import { Module } from '@nestjs/common';
import {
  CreateUserService,
  DeleteAvatarService,
  LoadAvatarByUserIdService,
  LoadUserByIdService,
} from './usecases';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: 'CreateUser',
      useClass: CreateUserService,
    },
    DeleteAvatarService,
    LoadAvatarByUserIdService,
    LoadUserByIdService,
  ],
  exports: [
    {
      provide: 'CreateUser',
      useClass: CreateUserService,
    },
    DeleteAvatarService,
    LoadAvatarByUserIdService,
    LoadUserByIdService,
  ],
})
export class DataModule {}
