import { Injectable } from '@nestjs/common';
import { SendEventService } from '../rabbitmq/send-event/send-event.service';
import { CreateUserRepository } from 'src/infra/mongodb/repositories/create-user-repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly sendEventService: SendEventService,
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(body: any) {
    const user = await this.createUserRepository.create(body);
    await this.sendEventService.sendEvent(body);
    return { user };
  }
}
