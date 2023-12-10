import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});

  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // app.use(
  //   '/public/videos',
  //   express.static(join(__dirname, '..', 'public', 'videos')),
  // );

  await app.listen(3010);
}
bootstrap();
