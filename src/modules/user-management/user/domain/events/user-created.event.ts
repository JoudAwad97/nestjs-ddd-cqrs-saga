import { DomainEvent, DomainEventProps } from '@src/libs/ddd';
import { UserEntity } from '../user.entity';

export class UserCreatedEvent extends DomainEvent {
  /**
   * Changeable properties to send in the event
   */
  public user: UserEntity;

  constructor(props: DomainEventProps<UserCreatedEvent>) {
    super(props);
    this.user = props.user;
  }
}
