import { UserEntity } from '@src/modules/user/domain/user.entity';
import { CommentEntity } from '../../domain/comment.entity';

export interface CommentWithAuthor {
  comment: CommentEntity;
  author: UserEntity;
}
