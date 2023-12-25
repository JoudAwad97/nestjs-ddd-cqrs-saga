import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-created.integration.event';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { TranslatorServicePort } from '../../infrastructure/anti-corruption-layer/translator.service.port';

@Controller()
export class SendWelcomeEmailListener {
  constructor(
    private readonly logger: LoggerPort,
    private readonly notificationTranslatorService: TranslatorServicePort,
  ) {}

  @EventPattern(UserCreatedIntegrationEvent.name)
  async sendWelcomeEmail(@Payload() data: UserCreatedIntegrationEvent) {
    this.logger.log('SendWelcomeEmailListener running...');
    const notificationUser =
      await this.notificationTranslatorService.translatorToNotificationUser(
        data.userId,
      );
    this.logger.log(
      `Sending Welcome Email to ${notificationUser.getProps().email}...`,
    );
  }
}
