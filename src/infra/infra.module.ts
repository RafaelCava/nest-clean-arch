import { Module } from '@nestjs/common';
import { databaseProviders, schemasProviders } from './mongodb/providers';
import { CreateUserRepository } from './mongodb/repositories/create-user-repository';

@Module({
  providers: [...databaseProviders, ...schemasProviders, CreateUserRepository],
  exports: [...databaseProviders, ...schemasProviders, CreateUserRepository],
})
export class InfraModule {}
