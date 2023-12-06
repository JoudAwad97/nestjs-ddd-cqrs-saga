import { DomainEvent } from '../ddd';

export interface IEventPublisherPort {
  publish(eventName: string, eventPayload: DomainEvent): void;
}
