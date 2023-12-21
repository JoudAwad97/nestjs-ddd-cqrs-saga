import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class UserCreatedIntegrationEvent extends IntegrationEvent {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public nickName: string;

  constructor(props: IntegrationEventProps<UserCreatedIntegrationEvent>) {
    super(props, 'UserCreatedIntegrationEvent');
    this.userId = props.userId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.nickName = props.nickName;
  }
}
