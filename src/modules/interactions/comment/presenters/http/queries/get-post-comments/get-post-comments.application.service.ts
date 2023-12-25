import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostCommentsQuery } from './get-post-comments.query';
import { CommentRepositoryPort } from '../../../../infrastructure/prisma/repository/comment.repository.port';
import { Paginated } from '@src/libs/ports/repository.port';
import { CommentWithAuthorResponseDto } from '../../../dtos/comment-with-author.dto';

@QueryHandler(FindPostCommentsQuery)
export class FindPostCommentsQueryApplicationService
  implements IQueryHandler<FindPostCommentsQuery>
{
  constructor(private readonly commentRepository: CommentRepositoryPort) {}

  async execute(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorResponseDto>> {
    return this.commentRepository.fetchPostComments(query);
  }
}
