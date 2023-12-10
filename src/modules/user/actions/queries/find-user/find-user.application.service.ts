import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { FindUserQuery } from './find-user.query';
import { UserErrors } from '@src/modules/user/domain/user.errors';
import { LOGGER } from '@src/constants';

@QueryHandler(FindUserQuery)
export class FindUserQueryApplicationService
  implements IQueryHandler<FindUserQuery>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  async execute(query: FindUserQuery): Promise<UserEntity> {
    this.logger.log(`Querying Paginated Users: ${JSON.stringify(query)}`);

    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      this.logger.error(`User not found: ${JSON.stringify(query)}`);
      UserErrors.UserNotFound();
    }

    return user;
  }
}
