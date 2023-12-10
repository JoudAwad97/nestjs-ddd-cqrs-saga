import { RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentWithAuthor } from './comment.repository.types';

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  fetchCommentWithAuthor(id: string): Promise<CommentWithAuthor>;
}
