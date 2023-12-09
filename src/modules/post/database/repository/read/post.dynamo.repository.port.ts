import { PostEntity } from '@src/modules/post/domain/post.entity';

export interface PostProjectionRepositoryPort {
  create(post: PostEntity): Promise<PostEntity>;
  delete(postId: string, userId: string): Promise<void>;
  findAll(): Promise<PostEntity[]>;
}
