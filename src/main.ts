import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_CONNECTION, RABBITMQ_QUEUE } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * TODO: IMPLEMENT DIFFERENT QUEUES FOR EACH USE CASE
   */
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

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
