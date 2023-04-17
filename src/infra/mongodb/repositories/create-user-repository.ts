import { Inject, Injectable } from '@nestjs/common';
import UserSchema from '../schemas/user';
import { Model } from 'mongoose';
import { CreateUserRepository } from 'src/data/protocols';

@Injectable()
export class CreateUserMongoRepository implements CreateUserRepository {
  constructor(@Inject('USER_MODEL') private user: Model<typeof UserSchema>) {}
  async create(
    data: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Result> {
    const user: any = await this.user.create(data);
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  }
}
