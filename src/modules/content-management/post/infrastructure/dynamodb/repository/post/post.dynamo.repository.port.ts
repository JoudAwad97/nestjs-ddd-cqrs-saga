import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';

export abstract class PostRepositoryPort {
  abstract create(post: PostEntity): Promise<PostEntity>;
  abstract delete(postId: string, userId: string): Promise<void>;
  abstract findAll(): Promise<PostEntity[]>;
}
