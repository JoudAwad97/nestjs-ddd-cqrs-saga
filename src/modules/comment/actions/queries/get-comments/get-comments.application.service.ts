import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { Inject } from '@nestjs/common';
import { LOGGER } from '@src/constants';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { COMMENT_REPOSITORY } from '@src/modules/comment/comment.di-tokens';
import { CommentRepositoryPort } from '@src/modules/comment/database/repository/comment.repository.port';
import { CommentWithAuthor } from '@src/modules/comment/interfaces/comment.types';

@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryApplicationService
  implements IQueryHandler<FindCommentsQuery>
{
  constructor(
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
  ) {}

  execute(): Promise<CommentWithAuthor[]> {
    this.logger.log(`Querying Comments`);
    return this.commentRepository.fetchCommentsWithAuthor();
  }
}
