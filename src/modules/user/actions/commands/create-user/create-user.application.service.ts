import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { CreateUserCommand } from './create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  USER_EVENT_PUBLISHER,
  USER_LOGGER,
  USER_REPOSITORY,
} from '@src/modules/user/user.di-tokens';
import { AggregateID } from '@src/libs/ddd';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { UserErrors } from '@src/modules/user/domain/user.errors';

@CommandHandler(CreateUserCommand)
export class CreateUserApplicationService
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
    @Inject(USER_LOGGER) private readonly logger: ILoggerPort,
  ) {}

  async execute(command: CreateUserCommand): Promise<AggregateID> {
    // extract data from the command
    const { email, firstName, lastName, password, nickName } = command;

    const userExists = await this.userRepository.findOneByEmail(email);

    if (userExists) {
      UserErrors.EmailAlreadyInUse();
    }

    // create a new user entity
    const user = UserEntity.create({
      email,
      firstName,
      lastName,
      password,
      nickName,
    });

    this.logger.log("Creating user's account");
    const result = await this.userRepository.create(user);

    // publish events related to the "create" action
    // passing of the event publisher and logger is dynamic here as both uses ports
    user.publishEvents(this.eventPublisher, this.logger);

    return result.id;
  }
}
