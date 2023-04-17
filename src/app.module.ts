import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [InfraModule, PresentationModule, DataModule],
})
export class AppModule {}
