import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostLikesQuery } from './get-likes-by-post.query';
import { LikesRepositoryPort } from '@src/modules/interactions/likes/infrastructure/prisma/repository/like.repository.port';
import { LikePaginatedResponseDto } from '../../../dtos/like.dto';

@QueryHandler(GetPostLikesQuery)
export class GetPostLikesQueryApplicationService
  implements IQueryHandler<GetPostLikesQuery, LikePaginatedResponseDto>
{
  constructor(private readonly likesRepository: LikesRepositoryPort) {}

  async execute(query: GetPostLikesQuery): Promise<LikePaginatedResponseDto> {
    return this.likesRepository.fetchPostLikes(query);
  }
}
