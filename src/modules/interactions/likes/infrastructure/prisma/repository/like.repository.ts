import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { LikeEntity } from '../../../domain/like.entity';
import { LikeModel } from '../schema/like.schema';
import { LikesRepositoryPort } from './like.repository.port';
import { Paginated } from '@src/libs/ports/repository.port';
import { LikeDetailedResponseDto } from '../../../presenters/dtos/like.dto';
import { GetPostLikesQuery } from '../../../presenters/http/queries/get-likes-by-post/get-likes-by-post.query';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/database-providers/prisma/prisma';
import { LikeMapperPort } from '../mapper/like.mapper.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { orderByFieldExtractor } from '@src/libs/utils';

@Injectable()
export class LikeRepository
  extends BaseEntityRepository<LikeEntity, LikeModel, 'Like'>
  implements LikesRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Like';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: LikeMapperPort,
    protected readonly logger: LoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchLikes(): Promise<LikeDetailedResponseDto[]> {
    return this.prismaService.like
      .findMany({
        include: {
          user: true,
        },
      })
      .then((res) =>
        res.map((like) => this.mapper.toDetailedResponse(like, like.user)),
      );
  }

  async fetchPostLikes(
    query: GetPostLikesQuery,
  ): Promise<Paginated<LikeDetailedResponseDto>> {
    const { limit, offset, page, orderBy, postId } = query;

    const [likes, count] = await Promise.all([
      this.prismaService.like.findMany({
        take: limit,
        skip: offset,
        orderBy: orderByFieldExtractor('Like', orderBy.field, orderBy.param),
        where: {
          post_id: postId,
        },
        include: {
          user: true,
        },
      }),
      this.prismaService.like.count({
        where: {
          post_id: postId,
        },
      }),
    ]);

    return {
      page,
      limit,
      count,
      data: likes.map((like) =>
        this.mapper.toDetailedResponse(like, like.user),
      ),
    };
  }
}
