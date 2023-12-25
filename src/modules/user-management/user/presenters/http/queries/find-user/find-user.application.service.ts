import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { FindUserQuery } from './find-user.query';
import { UserErrors } from '@src/modules/user-management/user/domain/user.errors';

@QueryHandler(FindUserQuery)
export class FindUserQueryApplicationService
  implements IQueryHandler<FindUserQuery>
{
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: LoggerPort,
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
