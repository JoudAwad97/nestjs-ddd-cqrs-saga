import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostsQuery } from './fetch-post.query';
import { Inject } from '@nestjs/common';
import { POST_PROJECTION_REPOSITORY } from '@src/modules/content-management/post/post.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PostProjectionRepositoryPort } from '@src/modules/content-management/post/database/repository/read/post/post.dynamo.repository.port';
import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';
import { LOGGER } from '@src/constants';

@QueryHandler(FindPostsQuery)
export class FindPostsQueryApplicationService
  implements IQueryHandler<FindPostsQuery>
{
  constructor(
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(POST_PROJECTION_REPOSITORY)
    private readonly postProjectionReadRepository: PostProjectionRepositoryPort,
  ) {}

  async execute(query: FindPostsQuery): Promise<PostEntity[]> {
    this.logger.log(`Querying Paginated Posts: ${JSON.stringify(query)}`);
    return this.postProjectionReadRepository.findAll();
  }
}
