import { CommandHandler } from '@nestjs/cqrs';
import { UserAccountValidationCommand } from './user-account-validation.command';
import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { UserErrors } from '@src/modules//user-management/user/domain/user.errors';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';

@CommandHandler(UserAccountValidationCommand)
export class UserAccountValidationApplicationService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: LoggerPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: UserAccountValidationCommand): Promise<void> {
    this.logger.log('Validating user account');
    // extract data from the command
    const { userId } = command;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.warn('User not found');
      UserErrors.UserNotFound();
    }

    // do some logic for account validation like calling 3rd party services
    if (user.email.getEmail().includes('@fake')) {
      this.logger.warn('User email is invalid');
      await this.userRepository.updateUser(user);

      user.publishEvents(this.eventPublisher, this.logger);
    }
  }
}
