import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, mergeMap } from 'rxjs';
import { UserCreatedEvent } from '../domain/events/user-created.event';
import { UserAccountValidationCommand } from '../actions/commands/user-account-validation/user-account-validation.command';
import { SendWelcomeEmailCommand } from '../actions/commands/send-welcome-email/send-welcome-email.event';

@Injectable()
export class UserCreatedSaga {
  /**
   * Saga will listen to "Events" & Trigger Commands based on those events
   */
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      mergeMap((event: UserCreatedEvent) => [
        new UserAccountValidationCommand({
          userId: event.user.id,
        }),
        new SendWelcomeEmailCommand({
          userId: event.user.id,
        }),
      ]),
      /**
       * the power of saga is to keep listening for more events and fire commands depending on those events
       * those events that are combined together for the same purpose will belong to the same saga in one domain
       */
      /**
       * ofType(UserVerificationCompletedEvent),
       * map((event: UserVerificationCompletedEvent) =>
       * new HandleValidationCompleteCommand({
       *   userId: event.user.id,
       * })
       * ),
       */
    );
  };
}
