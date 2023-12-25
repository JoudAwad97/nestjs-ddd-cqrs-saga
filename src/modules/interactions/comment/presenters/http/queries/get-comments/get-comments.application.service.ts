import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { CommentRepositoryPort } from '@src/modules/interactions/comment/infrastructure/prisma/repository/comment.repository.port';
import { CommentWithAuthorReadModel } from '@src/modules/interactions/comment/domain/read-models/comment.read-model';

@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryApplicationService
  implements IQueryHandler<FindCommentsQuery>
{
  constructor(private readonly commentRepository: CommentRepositoryPort) {}

  async execute(): Promise<CommentWithAuthorReadModel[]> {
    return this.commentRepository.fetchComments();
  }
}
