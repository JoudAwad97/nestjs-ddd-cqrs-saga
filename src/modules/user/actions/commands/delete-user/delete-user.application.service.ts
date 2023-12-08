import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import {
  USER_EVENT_PUBLISHER,
  USER_LOGGER,
  USER_REPOSITORY,
} from '@src/modules/user/user.di-tokens';
import { DeleteUserCommand } from './delete-user.command';
import { CreateUserCommand } from '../create-user/create-user.command';
import { UserErrors } from '@src/modules/user/domain/user.errors';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserApplicationService
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(USER_LOGGER) private readonly logger: ILoggerPort,
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    this.logger.log("Deleting user's account");
    const { id } = command;

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw UserErrors.UserNotFound();
    }

    this.logger.log("Deleting user's account");
    user.delete();
    await this.userRepository.delete(id);

    // TODO: Add a listener for this event to trigger an Integration Event to other part of the system
    // this event will be published with in-memory bus, while the integration event will be published with MessageBroker
    user.publishEvents(this.eventPublisher, this.logger);
  }
}
