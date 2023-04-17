import { Module } from '@nestjs/common';
import { CreateUserModule } from './create-user/create-user.module';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';
import { InfraModule } from './infra/infra.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [CreateUserModule, RabbitMqModule, InfraModule, HttpModule],
})
export class AppModule {}
