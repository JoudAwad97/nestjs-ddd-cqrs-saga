import { Injectable } from '@nestjs/common';
import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';
import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

@Injectable()
export class LikeService {
  canCreateLike(author: AuthorEntity, post: PostEntity): boolean {
    // consider adding a status to the user record
    if (author && post.canLikePost()) {
      return true;
    }
    return false;
  }
}
