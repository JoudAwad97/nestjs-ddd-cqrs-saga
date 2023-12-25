import { Injectable } from '@nestjs/common';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PrismaService } from '@src/shared/infrastructure/database-providers/prisma/prisma';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { CommentEntity } from '../../../domain/comment.entity';
import { CommentModel } from '../schema/comment.schema';
import { CommentRepositoryPort } from './comment.repository.port';
import { CommentMapperPort } from '../mapper/comment.mapper.port';
import { Paginated } from '@src/libs/ports/repository.port';
import { FindPostCommentsQuery } from '../../../presenters/http/queries/get-post-comments/get-post-comments.query';
import { orderByFieldExtractor } from '@src/libs/utils';
import { CommentWithAuthorReadModel } from '../../../domain/read-models/comment.read-model';

@Injectable()
export class CommentRepository
  extends BaseEntityRepository<CommentEntity, CommentModel>
  implements CommentRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Comment';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: CommentMapperPort,
    protected readonly logger: LoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchPostComments(
    query: FindPostCommentsQuery,
  ): Promise<Paginated<CommentWithAuthorReadModel>> {
    const { limit, offset, page, orderBy, postId } = query;

    const [comments, count] = await Promise.all([
      this.prismaService.comment.findMany({
        take: limit,
        skip: offset,
        orderBy: orderByFieldExtractor('Comment', orderBy.field, orderBy.param),
        where: {
          post_id: postId,
        },
        include: {
          user: true,
        },
      }),
      this.prismaService.comment.count({
        where: {
          post_id: postId,
        },
      }),
    ]);

    return {
      page,
      limit,
      count,
      data: comments.map((comment) =>
        this.mapper.databaseModelToResponseDto(comment, comment.user),
      ),
    };
  }

  async fetchComments(): Promise<CommentWithAuthorReadModel[]> {
    return this.prismaService.comment
      .findMany({
        include: {
          user: true,
        },
      })
      .then((result) =>
        result.map((res) =>
          this.mapper.databaseModelToResponseDto(res, res.user),
        ),
      );
  }
}
