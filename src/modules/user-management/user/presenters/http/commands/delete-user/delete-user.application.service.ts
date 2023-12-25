import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { DeleteUserCommand } from './delete-user.command';
import { CreateUserCommand } from '../create-user/create-user.command';
import { UserErrors } from '@src/modules/user-management/user/domain/user.errors';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserApplicationService
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: LoggerPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    this.logger.log("Deleting user's account");
    const { id } = command;

    const user = await this.userRepository.findById(id);
    if (!user) {
      UserErrors.UserNotFound();
    }

    this.logger.log("Deleting user's account");
    user.delete();
    await this.userRepository.delete(id);

    // TODO: Add a listener for this event to trigger an Integration Event to other part of the system
    // this event will be published with in-memory bus, while the integration event will be published with MessageBroker
    user.publishEvents(this.eventPublisher, this.logger);
  }
}
