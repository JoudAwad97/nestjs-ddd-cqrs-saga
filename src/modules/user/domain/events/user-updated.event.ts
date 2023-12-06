import { DomainEvent, DomainEventProps } from '@src/libs/ddd';
import { UserEntity } from '../user.entity';
import { UserChangeTypes } from '../user.types';

export class UserUpdatedEvent extends DomainEvent {
  /**
   * Changeable properties to send in the event
   */
  public oldUser: UserEntity;
  public newUser: UserEntity;
  public changeType: UserChangeTypes;

  constructor(props: DomainEventProps<UserUpdatedEvent>) {
    super(props);
    this.oldUser = props.oldUser;
    this.newUser = props.newUser;
    this.changeType = props.changeType;
  }
}
