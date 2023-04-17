import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avatar } from 'src/domain/models/avatar';

@Injectable()
export class CreateAvatarRepository {
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async create(avatar: Avatar): Promise<any> {
    await this.avatar.create(avatar);
  }
}
