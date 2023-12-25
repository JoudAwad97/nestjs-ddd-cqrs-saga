import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostsQuery } from './fetch-post.query';
import { Inject } from '@nestjs/common';
import {
  AUTHOR_PROJECTION_REPOSITORY,
  POST_MAPPER,
  POST_PROJECTION_REPOSITORY,
} from '@src/modules/content-management/post/post.di-tokens';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PostRepositoryPort } from '@src/modules/content-management/post/infrastructure/dynamodb/repository/post/post.dynamo.repository.port';
import { LOGGER } from '@src/shared/constants';
import { PostResponseDto } from '../../../dtos/post.dto';
import { AuthorRepositoryPort } from '../../../../infrastructure/dynamodb/repository/author/author.dynamo.repository.port';
import { PostMapper } from '../../../../infrastructure/prisma/mapper/post.mapper';

@QueryHandler(FindPostsQuery)
export class FindPostsQueryApplicationService
  implements IQueryHandler<FindPostsQuery>
{
  constructor(
    private readonly logger: LoggerPort,
    @Inject(POST_PROJECTION_REPOSITORY)
    private readonly postProjectionReadRepository: PostRepositoryPort,
    @Inject(AUTHOR_PROJECTION_REPOSITORY)
    private readonly authorProjectionRepository: AuthorRepositoryPort,
    @Inject(POST_MAPPER) private readonly postMapper: PostMapper,
  ) {}

  async execute(query: FindPostsQuery): Promise<PostResponseDto[]> {
    this.logger.log(`Querying Paginated Posts: ${JSON.stringify(query)}`);

    const posts = await this.postProjectionReadRepository.findAll();
    const authors = await this.authorProjectionRepository.findAuthorsByIds(
      posts.map((post) => post.getProps().authorId),
    );

    return posts.map((post) => ({
      // create me a code that maps the authors to the right post
      author: authors
        .find((author) => post.getProps().authorId === author.id)
        ?.getProps(),
      ...this.postMapper.toResponse(post),
    }));
  }
}
