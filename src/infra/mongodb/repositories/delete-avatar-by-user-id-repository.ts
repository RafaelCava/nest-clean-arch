import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avatar } from '../../../domain/models/avatar';

@Injectable()
export class DeleteAvatarByUserIdRepository {
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async deleteByUserId(userId: string): Promise<void> {
    await this.avatar.deleteOne({ user: userId });
  }
}
