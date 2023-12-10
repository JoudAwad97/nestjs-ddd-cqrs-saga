import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { FindUsersQuery } from './find-users.query';
import { Paginated } from '@src/libs/ports/repository.port';
import { LOGGER } from '@src/constants';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryApplicationService
  implements IQueryHandler<FindUsersQuery>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  async execute(query: FindUsersQuery): Promise<Paginated<UserEntity>> {
    // extract data from the command
    this.logger.log(`Querying Paginated Users: ${JSON.stringify(query)}`);

    return this.userRepository.fetchPaginatedUsers(query);
  }
}
