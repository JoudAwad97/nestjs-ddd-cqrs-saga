import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { UserCreatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-created.integration.event';
import { LoggerPort } from '@src/libs/ports/logger.port';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly logger: LoggerPort,
  ) {}

  // publish a integration event (Domain Events can publish and generate integration events but they should not be used to notify other part of the system)
  // https://www.milanjovanovic.tech/blog/how-to-use-domain-events-to-build-loosely-coupled-systems
  handle(event: UserCreatedEvent) {
    const user = event.user;
    // create a integration event
    const userCreatedIntegrationEvent = new UserCreatedIntegrationEvent({
      userId: user.id,
      aggregateId: user.id,
      firstName: user.getProps().firstName,
      lastName: user.getProps().lastName,
      nickName: user.getProps().nickName,
    });

    this.logger.log(
      'UserCreatedEventHandler.handle: publish integration event',
    );

    // publish integration event for other modular to consume
    this.eventPublisher.publishIntegrationEvent(
      userCreatedIntegrationEvent.name,
      userCreatedIntegrationEvent,
    );

    /**
     * This is a dummy code that will ack the domain event to trigger the saga implementation we have in our application
     * note that the default @Saga in nestjs are only used with Domain Events as for integration events we will have to integrate another implementation
     * currently the library @nestjs/cqrs only support domain events with the @Saga
     */
    // user.clearEvents();
    // user.ackUser();
    // user.publishEvents(this.eventPublisher, this.logger);
  }
}
