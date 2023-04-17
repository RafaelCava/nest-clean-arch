import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const main = await NestFactory.create(MainModule);
  main.setGlobalPrefix('api');
  await main.listen(process.env.PORT);
}
bootstrap();
