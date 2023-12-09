import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { Inject } from '@nestjs/common';
import { USER_EVENT_PUBLISHER, USER_LOGGER } from '../../user.di-tokens';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { UserCreatedIntegrationEvent } from '@src/shared/events/user-created.integration.event';
import { ILoggerPort } from '@src/libs/ports/logger.port';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
    @Inject(USER_LOGGER) private readonly logger: ILoggerPort,
  ) {}

  // publish a integration event (Domain Events can publish and generate integration events but they should not be used to notify other part of the system)
  // https://www.milanjovanovic.tech/blog/how-to-use-domain-events-to-build-loosely-coupled-systems
  handle(event: UserCreatedEvent) {
    // create a integration event
    const userCreatedIntegrationEvent = new UserCreatedIntegrationEvent({
      userId: event.user.id,
      aggregateId: event.user.id,
      email: event.user.email.getEmail(),
    });

    this.logger.log(
      'UserCreatedEventHandler.handle: publish integration event',
    );
    this.eventPublisher.publishIntegrationEvent(
      userCreatedIntegrationEvent.name,
      userCreatedIntegrationEvent,
    );
  }
}