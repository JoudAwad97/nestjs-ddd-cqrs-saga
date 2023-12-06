import { IEventPublisherPort } from '@libs/ports/event-publisher.port';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '@src/libs/ddd';

@Injectable()
export class EventEmitter implements IEventPublisherPort {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(eventName: string, eventPayload: DomainEvent): void {
    this.eventEmitter.emit(eventName, eventPayload);
  }
}
