import { PostEntity } from '../../../domain/post.entity';

export interface PostProjectionPort {
  projectPostToReadDB(post: PostEntity): Promise<void>;
  projectPostDeleteFromReadDB(postId: string, authorId: string): Promise<void>;
}
