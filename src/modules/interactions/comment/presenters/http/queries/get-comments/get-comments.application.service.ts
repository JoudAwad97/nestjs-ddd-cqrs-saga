import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY } from '@src/modules/interactions/comment/comment.di-tokens';
import { CommentRepositoryPort } from '@src/modules/interactions/comment/infrastructure/prisma/repository/comment.repository.port';
import { CommentWithAuthorReadModel } from '@src/modules/interactions/comment/domain/read-models/comment.read-model';

@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryApplicationService
  implements IQueryHandler<FindCommentsQuery>
{
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
  ) {}

  async execute(): Promise<CommentWithAuthorReadModel[]> {
    return this.commentRepository.fetchComments();
  }
}
