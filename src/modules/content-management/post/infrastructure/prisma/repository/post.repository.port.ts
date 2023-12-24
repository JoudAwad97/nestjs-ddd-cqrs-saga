import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { PostEntity } from '../../../domain/post.entity';

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  // add more methods here
  fetchPaginatedPosts(
    input: PaginatedQueryBase,
  ): Promise<Paginated<PostEntity>>;

  updatePost(post: PostEntity): Promise<PostEntity>;

  deleteAuthorPosts(authorId: string): Promise<void>;
}
