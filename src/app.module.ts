import { Module } from '@nestjs/common';
import { CreateUserModule } from './create-user/create-user.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [CreateUserModule, RabbitmqModule, InfraModule],
})
export class AppModule {}
