import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';
import { LoggerPort } from '../ports/logger.port';
import { RequestContextService } from '../application/context/AppRequestContext';
import { EventPublisher } from '../ports/event-publisher.port';

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

  /**
   * this is basically a way of publishing Domain-Events the full integrations can be used with either:
   * 1. CQRS built in publisher
   * 2. EventEmitter
   * 3. RabbitMQ
   * 4. Kafka
   * @param eventPublisher
   * @param logger
   */
  public publishEvents(
    eventPublisher: EventPublisher,
    logger: LoggerPort,
  ): void {
    this.domainEvents.map(async (event) => {
      logger.debug(
        `[${RequestContextService.getRequestId()}] "${
          event.constructor.name
        }" event published for aggregate ${this.constructor.name} : ${this.id}`,
      );
      return eventPublisher.publishDomainEvent(event);
    });
    this.clearEvents();
  }
}
