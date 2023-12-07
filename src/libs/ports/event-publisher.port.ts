import { DomainEvent } from '../ddd';

export interface IEventPublisherPort {
  publishDomainEvent(eventPayload: DomainEvent): void;
  publishIntegrationEvent(eventPayload: DomainEvent): void;
}
