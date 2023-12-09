import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { Paginated } from '@src/libs/ports/repository.port';
import { orderByFieldExtractor } from '@src/libs/utils';
import { POST_LOGGER } from '../../post.di-tokens';
import { PostEntity } from '../../domain/post.entity';
import { PostModel } from '../schema/post.schema';
import { PostRepositoryPort } from './post.repository.port';
import { PostMapper } from '../mapper/post.mapper';

@Injectable()
export class PostRepository
  extends BaseEntityRepository<PostEntity, PostModel>
  implements PostRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Post';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: PostMapper,
    @Inject(POST_LOGGER) protected readonly logger: ILoggerPort,
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
