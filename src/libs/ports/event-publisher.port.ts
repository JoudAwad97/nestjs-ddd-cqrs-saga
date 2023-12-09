import { DomainEvent } from '../ddd';
import { ObjectLiteral } from '../types';

export interface IRequestPayload extends ObjectLiteral {}

export interface IEventPublisherPort {
  publishDomainEvent(eventPayload: DomainEvent): void;
  publishIntegrationEvent(eventName: string, eventPayload: DomainEvent): void;
  sendAndReceiveMessage<T>(
    messagePattern: string,
    payload: IRequestPayload,
  ): Promise<T>;
}
