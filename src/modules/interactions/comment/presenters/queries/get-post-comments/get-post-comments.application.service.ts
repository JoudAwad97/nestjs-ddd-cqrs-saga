import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostCommentsQuery } from './get-post-comments.query';
import { COMMENT_REPOSITORY } from '../../../comment.di-tokens';
import { CommentRepositoryPort } from '../../../infrastructure/prisma/repository/comment.repository.port';
import { Inject } from '@nestjs/common';
import { Paginated } from '@src/libs/ports/repository.port';
import { CommentWithAuthorResponseDto } from '../../dtos/comment-with-author.dto';

@QueryHandler(FindPostCommentsQuery)
export class FindPostCommentsQueryApplicationService
  implements IQueryHandler<FindPostCommentsQuery>
{
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
  ) {}

  async execute(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorResponseDto>> {
    return this.commentRepository.fetchPostComments(query);
  }
}
