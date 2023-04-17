import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avatar } from '../../../domain/models/avatar';
import { DeleteAvatarByUserIdRepository } from 'src/data/protocols';

@Injectable()
export class DeleteAvatarByUserIdMongoRepository
  implements DeleteAvatarByUserIdRepository
{
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async deleteByUserId(
    userId: string,
  ): Promise<DeleteAvatarByUserIdRepository.Result> {
    await this.avatar.deleteOne({ user: userId });
  }
}
