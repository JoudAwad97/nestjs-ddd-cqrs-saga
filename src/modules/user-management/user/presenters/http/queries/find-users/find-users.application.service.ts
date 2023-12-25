import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { FindUsersQuery } from './find-users.query';
import { Paginated } from '@src/libs/ports/repository.port';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryApplicationService
  implements IQueryHandler<FindUsersQuery>
{
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: LoggerPort,
  ) {}

  async execute(query: FindUsersQuery): Promise<Paginated<UserEntity>> {
    // extract data from the command
    this.logger.log(`Querying Paginated Users: ${JSON.stringify(query)}`);

    return this.userRepository.fetchPaginatedUsers(query);
  }
}
