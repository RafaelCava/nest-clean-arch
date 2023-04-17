import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avatar } from '../../../domain/models/avatar';
import { LoadAvatarByUserIdRepository } from '../../../data/protocols';

@Injectable()
export class LoadAvatarByUserIdMongoRepository
  implements LoadAvatarByUserIdRepository
{
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async loadByUserId(
    userId: string,
  ): Promise<LoadAvatarByUserIdRepository.Result> {
    return await this.avatar.findOne({ user: userId }).lean();
  }
}
