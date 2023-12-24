import { Paginated, RepositoryPort } from '@src/libs/ports/repository.port';
import { LikeEntity } from '../../../domain/like.entity';
import { LikeDetailedResponseDto } from '../../../presenters/dtos/like.dto';
import { GetPostLikesQuery } from '../../../presenters/http/queries/get-likes-by-post/get-likes-by-post.query';

export interface LikesRepositoryPort extends RepositoryPort<LikeEntity> {
  fetchLikes(): Promise<LikeDetailedResponseDto[]>;
  fetchPostLikes(
    query: GetPostLikesQuery,
  ): Promise<Paginated<LikeDetailedResponseDto>>;
}
