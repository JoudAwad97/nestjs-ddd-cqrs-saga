import { RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentWithAuthor } from '../../interfaces/comment.types';

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  fetchCommentsWithAuthor(): Promise<CommentWithAuthor[]>;
}
