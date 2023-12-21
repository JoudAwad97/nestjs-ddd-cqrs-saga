import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedIntegrationEvent } from '@src/shared/events/user-created.integration.event';
import { LOGGER } from '@src/constants';
import { ILoggerPort } from '@src/libs/ports/logger.port';

@Controller()
export class SendWelcomeEmailListener {
  constructor(@Inject(LOGGER) private readonly logger: ILoggerPort) {}

  @EventPattern(UserCreatedIntegrationEvent.name)
  async sendWelcomeEmail() {
    this.logger.log('SendWelcomeEmailListener running...');

    this.logger.log(`Sending Welcome Email...`);
  }
}
