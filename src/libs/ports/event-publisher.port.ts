import { DomainEvent } from '../ddd';

export interface IEventPublisherPort {
  publishDomainEvent(eventPayload: DomainEvent): void;
  publishIntegrationEvent(eventName: string, eventPayload: DomainEvent): void;
}
