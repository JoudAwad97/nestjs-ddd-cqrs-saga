import { DomainEvent } from '../ddd';

export interface IEventPublisherPort {
  publish(name: string, event: DomainEvent): void;
}
