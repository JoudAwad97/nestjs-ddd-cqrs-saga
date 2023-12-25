import { Paginated, RepositoryPort } from '@src/libs/ports/repository.port';
import { LikeEntity } from '../../../domain/like.entity';
import { LikeDetailedResponseDto } from '../../../presenters/dtos/like.dto';
import { GetPostLikesQuery } from '../../../presenters/http/queries/get-likes-by-post/get-likes-by-post.query';

export abstract class LikesRepositoryPort extends RepositoryPort<LikeEntity> {
  abstract fetchLikes(): Promise<LikeDetailedResponseDto[]>;
  abstract fetchPostLikes(
    query: GetPostLikesQuery,
  ): Promise<Paginated<LikeDetailedResponseDto>>;
}
