import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_CONNECTION, RABBITMQ_QUEUE } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONNECTION],
      queue: RABBITMQ_QUEUE,
      queueOptions: { durable: false },
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
