import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendWelcomeEmailCommand } from './send-welcome-email.event';
import { Inject } from '@nestjs/common';
import { USER_LOGGER } from '@src/modules/user/user.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';

@CommandHandler(SendWelcomeEmailCommand)
export class SendWelcomeEmailApplicationService
  implements ICommandHandler<SendWelcomeEmailCommand>
{
  constructor(@Inject(USER_LOGGER) private readonly logger: ILoggerPort) {}

  async execute(command: SendWelcomeEmailCommand): Promise<void> {
    this.logger.log('Sending welcome email...');
    this.logger.log(JSON.stringify(command));
  }
}
