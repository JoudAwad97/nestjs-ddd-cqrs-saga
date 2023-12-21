import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_EVENT_PUBLISHER } from '../../user.di-tokens';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { UserDeletedEvent } from '../../domain/events/user-deleted.event';
import { UserDeletedIntegrationEvent } from '@src/shared/events/user-deleted.integration.event';
import { LOGGER } from '@src/constants';

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler
  implements IEventHandler<UserDeletedEvent>
{
  constructor(
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  // publish a integration event (Domain Events can publish and generate integration events but they should not be used to notify other part of the system)
  // https://www.milanjovanovic.tech/blog/how-to-use-domain-events-to-build-loosely-coupled-systems
  handle(event: UserDeletedEvent) {
    // create a integration event
    const userDeletedIntegrationEvent = new UserDeletedIntegrationEvent({
      userId: event.userId,
      aggregateId: event.userId,
    });

    this.logger.log(
      'UserDeletedEventHandler.handle: publish integration event',
    );
    this.eventPublisher.publishIntegrationEvent(
      userDeletedIntegrationEvent.name,
      userDeletedIntegrationEvent,
    );
  }
}
