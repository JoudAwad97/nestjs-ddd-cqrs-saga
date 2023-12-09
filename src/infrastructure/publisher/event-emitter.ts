import {
  IEventPublisherPort,
  IRequestPayload,
} from '@libs/ports/event-publisher.port';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_INJECTION_NAME } from '@src/constants';
import { IntegrationEvent } from '@src/libs/application/integration/integration-event.base';
import { DomainEvent } from '@src/libs/ddd';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventEmitter implements IEventPublisherPort {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(RABBITMQ_INJECTION_NAME) private readonly client: ClientProxy,
  ) {}

  // we can have two different approaches to handle the event publishing
  // one for pushing domain specific events
  // and another for pushing integration events (system events)

  async sendAndReceiveMessage<T>(
    messagePattern: string,
    payload: IRequestPayload,
  ): Promise<T> {
    return firstValueFrom(this.client.send(messagePattern, payload));
  }

  publishIntegrationEvent(
    eventName: string,
    eventPayload: IntegrationEvent,
  ): void {
    this.client.emit(eventName, eventPayload);
  }

  publishDomainEvent(eventPayload: DomainEvent): void {
    this.eventBus.publish(eventPayload);
  }
}
