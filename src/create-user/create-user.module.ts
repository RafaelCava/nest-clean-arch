import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { RabbitMqModule } from 'src/rabbitmq/rabbitmq.module';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [RabbitMqModule, InfraModule],
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class CreateUserModule {}
