import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class UserAckEvent extends DomainEvent {
  /**
   * Changeable properties to send in the event
   */
  public userId: string;

  constructor(props: DomainEventProps<UserAckEvent>) {
    super(props);
    this.userId = props.userId;
  }
}
