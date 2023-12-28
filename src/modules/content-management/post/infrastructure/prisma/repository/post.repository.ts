import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { PrismaService } from '@src/shared/infrastructure/database-providers/prisma/prisma';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { Paginated } from '@src/libs/ports/repository.port';
import { orderByFieldExtractor } from '@src/libs/utils';
import { PostEntity } from '../../../domain/post.entity';
import { PostModel } from '../schema/post.schema';
import { PostRepositoryPort } from './post.repository.port';
import { PostRepositoryContract } from '@src/shared/application/contracts/post.contract';
import { PostMapperPort } from '../mapper/post.mapper.port';

@Injectable()
export class PostRepository
  extends BaseEntityRepository<PostEntity, PostModel, 'Post'>
  implements PostRepositoryPort, PostRepositoryContract
{
  protected modelName: Prisma.ModelName = 'Post';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: PostMapperPort,
    protected readonly logger: LoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchPaginatedPosts(
    input: PaginatedQueryBase,
  ): Promise<Paginated<PostEntity>> {
    // if the database we are using require different pagination input make sure to create a mapper
    const { limit, offset, page, orderBy } = input;

    const [result, count] = await Promise.all([
      this.prismaService.post.findMany({
        take: limit,
        skip: offset,
        orderBy: orderByFieldExtractor('Post', orderBy.field, orderBy.param),
      }),
      this.prismaService.post.count({}),
    ]);

    return {
      data: result.map(this.mapper.toDomain),
      count,
      page,
      limit,
    };
  }

  async updatePost(post: PostEntity): Promise<PostEntity> {
    const persistencePost = this.mapper.toPersistence(post);
    return this.prismaService.post
      .update({
        where: {
          id: post.id,
        },
        data: persistencePost,
      })
      .then(this.mapper.toDomain);
  }

  async deleteAuthorPosts(authorId: string): Promise<void> {
    await this.prismaService.post.deleteMany({
      where: {
        author_id: authorId,
      },
    });
  }
}
