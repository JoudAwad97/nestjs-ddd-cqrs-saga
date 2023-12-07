import { CommandHandler } from '@nestjs/cqrs';
import { UserAccountValidationCommand } from './user-account-validation.command';
import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { UserErrors } from '@src/modules/user/domain/user.errors';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import {
  USER_EVENT_PUBLISHER,
  USER_LOGGER,
  USER_REPOSITORY,
} from '@src/modules/user/user.di-tokens';

@CommandHandler(UserAccountValidationCommand)
export class UserAccountValidationApplicationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(USER_LOGGER) private readonly logger: ILoggerPort,
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
  ) {}

  async execute(command: UserAccountValidationCommand): Promise<void> {
    this.logger.log('Validating user account');
    // extract data from the command
    const { userId } = command;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.warn('User not found');
      throw UserErrors.UserNotFound();
    }

    // do some logic for account validation like calling 3rd party services
    if (user.email.getEmail().includes('@fake')) {
      this.logger.warn('User email is invalid');
      await this.userRepository.updateUser(user);

      user.publishEvents(this.eventPublisher, this.logger);
    }
  }
}
