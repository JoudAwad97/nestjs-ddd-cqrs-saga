import { Inject, Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import {
  EMPTY,
  Observable,
  filter,
  first,
  map,
  mergeMap,
  race,
  timer,
} from 'rxjs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { LOGGER } from '@src/shared/constants';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { NotifySupervisorCommand } from '../../presenters/http/commands/notify-supervisor/notify-supervisor.command';
import { UserAckEvent } from '../../domain/events/user-ack.event';

@Injectable()
export class UserCreatedSaga {
  constructor(@Inject(LOGGER) private readonly logger: LoggerPort) {}
  /**
   * This example is a little advance in Saga as most the documentation contains a basic usage
   * what we do in here is to listen to all "UserCreatedEvent" and then we wait for 3s to head an ack
   * if no ack has been heard in that duration we trigger a new command called "NotifySupervisorCommand"
   */
  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    // A stream of alarm acknowledged events
    const userAcknowledgedEvents$ = events$.pipe(ofType(UserAckEvent));

    // A stream of alarm created events
    const userCreatedEvents$ = events$.pipe(ofType(UserCreatedEvent));

    return userCreatedEvents$.pipe(
      // Wait for an alarm to be acknowledged or 10 seconds to pass
      mergeMap((userCreatedEvent) =>
        race(
          userAcknowledgedEvents$.pipe(
            filter(
              (userAcknowledgedEvent) =>
                userAcknowledgedEvent.userId ===
                userCreatedEvent.user.getProps().id,
            ),
            first(),
            // If the event is acknowledged, we don't need to do anything
            // Just return an empty observable that never emits
            mergeMap(() => EMPTY),
          ),
          timer(3000).pipe(map(() => userCreatedEvent)),
        ),
      ),
      map((userCreatedEvent: UserCreatedEvent) => {
        this.logger.debug(
          `⚠️⚠️⚠️ Alarm "UserCreatedEvent" not acknowledged in 3 seconds!`,
        );

        return new NotifySupervisorCommand({
          userId: userCreatedEvent.user.id,
        });
      }),
    );
  };
}
