import { RepositoryPort } from 'src/libs/ports/repository.port';
import { CommentEntity } from '../../domain/comment.entity';

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  fetchComments(): Promise<CommentEntity[]>;
}
