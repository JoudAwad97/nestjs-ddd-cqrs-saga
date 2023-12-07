import { IEventPublisherPort } from '@libs/ports/event-publisher.port';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@src/libs/ddd';

@Injectable()
export class EventEmitter implements IEventPublisherPort {
  constructor(private readonly eventBus: EventBus) {}

  // we can have two different approaches to handle the event publishing
  // one for pushing domain specific events
  // and another for pushing integration events (system events)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  publishIntegrationEvent(_eventPayload: any): void {
    throw new Error('Method not implemented.');
  }

  publishDomainEvent(eventPayload: DomainEvent): void {
    this.eventBus.publish(eventPayload);
  }
}
