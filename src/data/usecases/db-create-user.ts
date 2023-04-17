import { Inject, Injectable } from '@nestjs/common';
import { SendEventService } from '../../infra/rabbitMQ/events/send-event.service';
import { CreateUserRepository } from '../protocols';
import { CreateUser } from 'src/domain/usecases';

@Injectable()
export class DbCreateUser implements CreateUser {
  constructor(
    private readonly sendEventService: SendEventService,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(body: CreateUser.Params): Promise<CreateUser.Result> {
    const user = await this.createUserRepository.create(body);
    await this.sendEventService.sendEvent(body);
    return { user };
  }
}
