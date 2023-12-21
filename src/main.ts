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
      queueOptions: {
        /**
         * This setting determines whether the queue is durable or not.
         * - Durable queues are persisted to disk and thus survive broker restarts.
         * - Non-durable queues (when durable is set to false) reside only in memory and are lost if the RabbitMQ server restarts.
         * In your case, setting durable: false means that the messages in the queue will be lost if the server restarts or crashes.
         */
        durable: false,
      },
      /**
       * This setting is related to message acknowledgment.
       * In RabbitMQ, when a message is sent to a queue,
       * the server waits for an acknowledgment from the consumer before it considers the message to be successfully processed
       * and removes it from the queue.
       * If noAck is set to false (as in your case), it means acknowledgments are required.
       * The consumer must explicitly acknowledge each message after processing.
       * This ensures that if the consumer fails to process a message (due to crashing or other issues),
       * the message is not lost and can be redelivered.
       * If noAck were set to true, RabbitMQ would not expect an acknowledgment,
       * and the message would be removed from the queue once delivered to a consumer,
       * regardless of whether it was processed successfully.
       */
      noAck: false,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.startAllMicroservices();

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
