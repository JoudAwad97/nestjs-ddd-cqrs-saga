import { PostEntity } from '../../../domain/post.entity';

export abstract class PostProjectionPort {
  abstract projectPostToReadDB(post: PostEntity): Promise<void>;
  abstract projectPostDeleteFromReadDB(
    postId: string,
    authorId: string,
  ): Promise<void>;
}
