import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { PostEntity } from '../../../domain/post.entity';

export abstract class PostRepositoryPort extends RepositoryPort<PostEntity> {
  // add more methods here
  abstract fetchPaginatedPosts(
    input: PaginatedQueryBase,
  ): Promise<Paginated<PostEntity>>;

  abstract updatePost(post: PostEntity): Promise<PostEntity>;

  abstract deleteAuthorPosts(authorId: string): Promise<void>;
}
