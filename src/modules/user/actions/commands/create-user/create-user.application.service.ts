import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { CreateUserCommand } from './create-user.command';
import { CommandHandler } from '@nestjs/cqrs';
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
import { UserAlreadyExistsError } from '@src/modules/user/domain/user.errors';

@CommandHandler(CreateUserCommand)
export class CreateUserApplicationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(USER_LOGGER) private readonly logger: ILoggerPort,
    @Inject(USER_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
  ) {}

  async execute(command: CreateUserCommand): Promise<AggregateID> {
    // extract data from the command
    const { email, firstName, lastName, password, nickName } = command;

    const userExists = await this.userRepository.findOneByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    // create a new user entity
    const user = UserEntity.create({
      email,
      firstName,
      lastName,
      password,
      nickName,
    });

    /**
     * TODO: change how we implement the baseRepository
     */
    this.logger.log("Creating user's account");
    const result = await this.userRepository.create(user);

    // publish events
    user.publishEvents(this.eventPublisher, this.logger);

    return result.id;
  }
}
