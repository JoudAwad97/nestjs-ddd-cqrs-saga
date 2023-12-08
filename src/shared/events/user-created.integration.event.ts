import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class UserCreatedIntegrationEvent extends IntegrationEvent {
  public userId: string;
  public email: string;

  constructor(props: IntegrationEventProps<UserCreatedIntegrationEvent>) {
    super(props, 'UserCreatedIntegrationEvent');
    this.userId = props.userId;
    this.email = props.email;
  }
}
