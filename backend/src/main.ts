import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  dotenv.config();
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
