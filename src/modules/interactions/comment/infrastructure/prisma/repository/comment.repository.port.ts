import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../../domain/comment.entity';
import { FindPostCommentsQuery } from '../../../presenters/http/queries/get-post-comments/get-post-comments.query';
import { CommentWithAuthorReadModel } from '../../../domain/read-models/comment.read-model';

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  fetchComments(): Promise<CommentWithAuthorReadModel[]>;
  fetchPostComments(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorReadModel>>;
}
