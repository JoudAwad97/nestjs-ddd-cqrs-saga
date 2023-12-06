import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';
import { ILoggerPort } from '../ports/logger.port';
import { RequestContextService } from '../application/context/AppRequestContext';
import { IEventPublisherPort } from '../ports/event-publisher.port';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(
    eventPublisher: IEventPublisherPort,
    logger: ILoggerPort,
  ): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `[${RequestContextService.getRequestId()}] "${
            event.constructor.name
          }" event published for aggregate ${this.constructor.name} : ${
            this.id
          }`,
        );
        return eventPublisher.publish(event.constructor.name, event);
      }),
    );
    this.clearEvents();
  }
}
