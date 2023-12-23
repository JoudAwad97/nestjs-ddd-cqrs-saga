import {
  IntegrationEvent,
  IntegrationEventProps,
} from '@src/libs/application/integration/integration-event.base';

export class UserDeletedIntegrationEvent extends IntegrationEvent {
  public userId: string;

  constructor(props: IntegrationEventProps<UserDeletedIntegrationEvent>) {
    super(props, 'UserDeletedIntegrationEvent');
    this.userId = props.userId;
  }
}
