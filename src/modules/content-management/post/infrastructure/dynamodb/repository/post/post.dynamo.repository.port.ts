import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';

export interface PostRepositoryPort {
  create(post: PostEntity): Promise<PostEntity>;
  delete(postId: string, userId: string): Promise<void>;
  findAll(): Promise<PostEntity[]>;
}
