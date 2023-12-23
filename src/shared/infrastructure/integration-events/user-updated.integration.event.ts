import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class UserUpdatedIntegrationEvent extends IntegrationEvent {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public nickName: string;

  constructor(props: IntegrationEventProps<UserUpdatedIntegrationEvent>) {
    super(props, 'UserUpdatedIntegrationEvent');
    this.userId = props.userId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.nickName = props.nickName;
  }
}
