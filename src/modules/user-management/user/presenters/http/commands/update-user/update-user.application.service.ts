import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserErrors } from '@src/modules/user-management/user/domain/user.errors';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';

@CommandHandler(UpdateUserCommand)
export class UpdateUserApplicationService
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly repository: UserRepositoryPort,
    private readonly logger: LoggerPort,
    private readonly publisher: EventPublisher,
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
