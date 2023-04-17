import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepository, SendEvent } from '../protocols';
import { CreateUser } from '../../domain/usecases';

@Injectable()
export class DbCreateUser implements CreateUser {
  constructor(
    @Inject('SendEvent')
    private readonly sendEvent: SendEvent,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(body: CreateUser.Params): Promise<CreateUser.Result> {
    const user = await this.createUserRepository.create(body);
    await this.sendEvent.sendEvent(body);
    return { user };
  }
}
