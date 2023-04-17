import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAvatarRepository } from '../../../data/protocols';
import { Avatar } from '../../../domain/models/avatar';

@Injectable()
export class CreateAvatarMongoRepository implements CreateAvatarRepository {
  constructor(@Inject('AVATAR_MODEL') private avatar: Model<Avatar>) {}
  async create(
    avatar: CreateAvatarRepository.Params,
  ): Promise<CreateAvatarRepository.Result> {
    await this.avatar.create(avatar);
  }
}
