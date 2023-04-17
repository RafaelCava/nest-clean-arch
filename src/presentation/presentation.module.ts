import { Module } from '@nestjs/common';
import {
  CreateUserController,
  DeleteAvatarController,
  LoadAvatarByUserIdController,
  LoadUserByIdController,
} from './controllers';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [
    CreateUserController,
    DeleteAvatarController,
    LoadAvatarByUserIdController,
    LoadUserByIdController,
  ],
})
export class PresentationModule {}
