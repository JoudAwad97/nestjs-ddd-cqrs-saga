import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_CONNECTION,
  RABBITMQ_INJECTION_NAME,
  RABBITMQ_QUEUE,
} from '@src/shared/constants/rabitqm.constant';

export function generateRabbitMQConfigurations(
  noAck: boolean = true,
  injectableName: string = RABBITMQ_INJECTION_NAME,
  queueName: string = RABBITMQ_QUEUE,
): ClientProviderOptions {
  return {
    name: injectableName,
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONNECTION],
      queue: queueName,
      queueOptions: { durable: false },
      noAck,
    },
  };
}
