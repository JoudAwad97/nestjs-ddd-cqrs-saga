import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { CreateUserCommand } from './create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AggregateID } from '@src/libs/ddd';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { UserErrors } from '@src/modules/user-management/user/domain/user.errors';

@CommandHandler(CreateUserCommand)
export class CreateUserApplicationService
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly eventPublisher: EventPublisher,
    private readonly logger: LoggerPort,
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
