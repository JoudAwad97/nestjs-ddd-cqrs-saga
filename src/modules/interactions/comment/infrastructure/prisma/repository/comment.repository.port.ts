import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../../domain/comment.entity';
import { FindPostCommentsQuery } from '../../../presenters/http/queries/get-post-comments/get-post-comments.query';
import { CommentWithAuthorReadModel } from '../../../domain/read-models/comment.read-model';

export abstract class CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  abstract fetchComments(): Promise<CommentWithAuthorReadModel[]>;
  abstract fetchPostComments(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorReadModel>>;
}
