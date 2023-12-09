import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostsQuery } from './fetch-post.query';
import { Inject } from '@nestjs/common';
import {
  POST_LOGGER,
  POST_PROJECTION_REPOSITORY,
} from '@src/modules/post/post.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PostProjectionRepositoryPort } from '@src/modules/post/database/repository/read/post.dynamo.repository.port';
import { PostEntity } from '@src/modules/post/domain/post.entity';

@QueryHandler(FindPostsQuery)
export class FindPostsQueryApplicationService
  implements IQueryHandler<FindPostsQuery>
{
  constructor(
    @Inject(POST_LOGGER) private readonly logger: ILoggerPort,
    @Inject(POST_PROJECTION_REPOSITORY)
    private readonly postProjectionReadRepository: PostProjectionRepositoryPort,
  ) {}

  async execute(query: FindPostsQuery): Promise<PostEntity[]> {
    this.logger.log(`Querying Paginated Posts: ${JSON.stringify(query)}`);
    return this.postProjectionReadRepository.findAll();
  }
}
