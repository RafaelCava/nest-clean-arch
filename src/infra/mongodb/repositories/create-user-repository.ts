import { Inject, Injectable } from '@nestjs/common';
import UserSchema from '../schemas/user';
import { Model } from 'mongoose';

@Injectable()
export class CreateUserRepository {
  constructor(@Inject('USER_MODEL') private user: Model<typeof UserSchema>) {}
  async create(data: any): Promise<any> {
    return await this.user.create(data);
  }
}
