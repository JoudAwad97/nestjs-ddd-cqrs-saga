import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserAckEvent } from '../../domain/events/user-ack.event';

@EventsHandler(UserAckEvent)
export class UserAckEventHandler implements IEventHandler<UserAckEvent> {
  constructor(private readonly logger: LoggerPort) {}

  // publish a integration event (Domain Events can publish and generate integration events but they should not be used to notify other part of the system)
  // https://www.milanjovanovic.tech/blog/how-to-use-domain-events-to-build-loosely-coupled-systems
  handle(event: UserAckEvent) {
    this.logger.log(`Acking User event ${JSON.stringify(event)}`);
  }
}
