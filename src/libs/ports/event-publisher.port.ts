import { DomainEvent } from '../ddd';
import { ObjectLiteral } from '../types';

export abstract class IRequestPayload extends ObjectLiteral {}

export abstract class EventPublisher {
  abstract publishDomainEvent(eventPayload: DomainEvent): void;
  abstract publishIntegrationEvent(
    eventName: string,
    eventPayload: DomainEvent,
  ): void;
  abstract sendAndReceiveMessage<T>(
    messagePattern: string,
    payload: IRequestPayload,
  ): Promise<T>;
}
