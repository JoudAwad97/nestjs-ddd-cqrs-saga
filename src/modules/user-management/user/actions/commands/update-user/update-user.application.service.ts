import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from '@src/modules/user-management/user/database/repository/user.repository';
import { Inject } from '@nestjs/common';
import {
  USER_EVENT_PUBLISHER,
  USER_REPOSITORY,
} from '@src/modules/user-management/user/user.di-tokens';
import { UserErrors } from '@src/modules/user-management/user/domain/user.errors';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { LOGGER } from '@src/constants';

@CommandHandler(UpdateUserCommand)
export class UpdateUserApplicationService
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository: UserRepository,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(USER_EVENT_PUBLISHER)
    private readonly publisher: IEventPublisherPort,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { userId, email } = command;

    const user = await this.repository.findById(userId);
    if (!user) {
      UserErrors.UserNotFound();
    }

    if (email !== user.email.getEmail()) {
      const userWithSameEmail = await this.repository.findOneByEmail(email);
      if (userWithSameEmail && userWithSameEmail.id !== userId) {
        UserErrors.EmailAlreadyInUse();
      }
    }

    this.logger.log('Updating user...');
    user.update(command);
    await this.repository.updateUser(user);
    user.publishEvents(this.publisher, this.logger);
  }
}