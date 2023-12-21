import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';
import { CommentErrors } from './comment.errors';

class CommentDomainService {
  canCommentOnPost(
    comment: CommentEntity,
    author?: UserEntity,
    post?: PostEntity,
  ) {
    if (!author || !author.allowedToComment()) {
      CommentErrors.AuthorCannotComment();
    }

    if (!post || !post.canCommentOnPost()) {
      CommentErrors.PostCannotBeCommented();
    }

    if (!comment.commentIsValid()) {
      CommentErrors.InvalidComment();
    }
  }
}

export const commentDomainService = new CommentDomainService();
