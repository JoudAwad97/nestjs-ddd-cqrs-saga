import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserUpdatedEvent } from '../../domain/events/user-updated.event';
import { UserUpdatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-updated.integration.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly logger: LoggerPort,
  ) {}

  // publish a integration event (Domain Events can publish and generate integration events but they should not be used to notify other part of the system)
  // https://www.milanjovanovic.tech/blog/how-to-use-domain-events-to-build-loosely-coupled-systems
  handle(event: UserUpdatedEvent) {
    // create a integration event
    const userUpdatedIntegrationEvent = new UserUpdatedIntegrationEvent({
      userId: event.newUser.id,
      aggregateId: event.newUser.id,
      firstName: event.newUser.getProps().firstName,
      lastName: event.newUser.getProps().lastName,
      nickName: event.newUser.getProps().nickName,
    });

    this.logger.log(
      'UserUpdatedEventHandler.handle: publish integration event',
    );
    this.eventPublisher.publishIntegrationEvent(
      userUpdatedIntegrationEvent.name,
      userUpdatedIntegrationEvent,
    );
  }
}
