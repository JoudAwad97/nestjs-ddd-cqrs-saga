import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-created.integration.event';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { NOTIFICATION_TRANSLATOR_SERVICE } from '../../notification.di-tokens';
import { TranslatorService } from '../../infrastructure/anti-corruption-layer/translator.service';

@Controller()
export class SendWelcomeEmailListener {
  constructor(
    private readonly logger: LoggerPort,
    @Inject(NOTIFICATION_TRANSLATOR_SERVICE)
    private readonly notificationTranslatorService: TranslatorService,
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
