import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifySupervisorCommand } from './notify-supervisor.command';
import { Inject } from '@nestjs/common';
import { LOGGER } from '@src/shared/constants';
import { LoggerPort } from '@src/libs/ports/logger.port';

@CommandHandler(NotifySupervisorCommand)
export class NotifySupervisorApplicationService
  implements ICommandHandler<NotifySupervisorCommand, void>
{
  constructor(@Inject(LOGGER) private readonly logger: LoggerPort) {}

  async execute(command: NotifySupervisorCommand): Promise<void> {
    this.logger.log(`Handling notify supervisor command...`);

    this.logger.log(
      `Notifying the Admin about User with id: ${command.userId}`,
    );
  }
}
