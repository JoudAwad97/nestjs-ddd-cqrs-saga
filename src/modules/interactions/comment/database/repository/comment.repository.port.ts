import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../domain/comment.entity';
import { FindPostCommentsQuery } from '../../actions/queries/get-post-comments/get-post-comments.query';
import { CommentWithAuthorResponseDto } from '../../dtos/comment-with-author.dto';

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  fetchComments(): Promise<CommentEntity[]>;
  fetchPostComments(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorResponseDto>>;
}
