import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class UserDeletedEvent extends DomainEvent {
  /**
   * Changeable properties to send in the event
   */
  public userId: string;

  constructor(props: DomainEventProps<UserDeletedEvent>) {
    super(props);
    this.userId = props.userId;
  }
}
