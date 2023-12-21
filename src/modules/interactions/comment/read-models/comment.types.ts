import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { CommentEntity } from '../domain/comment.entity';

/**
 * Read-Models are a Read-only interfaces that can be used in terms of queries
 * where we do not have to convert data from repository into domain entities
 * with that we can create a Read-Only interfaces that can be used for queries
 */
export interface ICommentWithAuthorReadModel {
  comment: CommentEntity;
  author: UserEntity;
}
