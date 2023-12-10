import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendWelcomeEmailCommand } from './send-welcome-email.event';
import { Inject } from '@nestjs/common';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { LOGGER } from '@src/constants';

@CommandHandler(SendWelcomeEmailCommand)
export class SendWelcomeEmailApplicationService
  implements ICommandHandler<SendWelcomeEmailCommand>
{
  constructor(@Inject(LOGGER) private readonly logger: ILoggerPort) {}

  async execute(command: SendWelcomeEmailCommand): Promise<void> {
    this.logger.log('Sending welcome email...');
    this.logger.log(JSON.stringify(command));
  }
}
