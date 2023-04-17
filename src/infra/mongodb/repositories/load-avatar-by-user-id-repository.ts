import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avatar } from '../../../domain/models/avatar';

@Injectable()
export class LoadAvatarByUserIdRepository {
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async loadByUserId(userId: string): Promise<Avatar> {
    return await this.avatar.findOne({ user: userId }).lean();
  }
}
