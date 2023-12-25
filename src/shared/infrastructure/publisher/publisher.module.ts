import { Module } from '@nestjs/common';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { EventEmitter } from './publisher';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from '@src/libs/utils';

@Module({
  imports: [
    ClientsModule.register({
      /**
       * TODO: IMPLEMENT DIFFERENT QUEUES FOR EACH USE CASE
       */
      clients: [
        {
          ...generateRabbitMQConfigurations(),
        },
      ],
    }),
  ],
  providers: [
    {
      provide: EventPublisher,
      useClass: EventEmitter,
    },
  ],
  exports: [EventPublisher],
})
export class PublisherModule {}
