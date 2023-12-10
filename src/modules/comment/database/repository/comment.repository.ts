import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_MAPPER, USER_MAPPER } from '../../comment.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentModel } from '../schema/comment.schema';
import { CommentRepositoryPort } from './comment.repository.port';
import { CommentMapperPort } from '../mapper/comment.mapper.port';
import { LOGGER } from '@src/constants';
import { CommentWithAuthor } from '../../comment.types';
import { UserMapperPort } from '@src/modules/user/database/mapper/user.mapper.port';

@Injectable()
export class CommentRepository
  extends BaseEntityRepository<CommentEntity, CommentModel>
  implements CommentRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Comment';
  protected prismaService: PrismaService;

  constructor(
    @Inject(USER_MAPPER)
    private readonly userMapper: UserMapperPort,
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
    @Inject(LOGGER) protected readonly logger: ILoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchCommentsWithAuthor(): Promise<CommentWithAuthor[]> {
    const comments = await this.prismaService.comment.findMany({
      include: {
        user: true,
      },
    });

    return comments.map((comment) => ({
      comment: this.mapper.toDomain(comment),
      author: this.userMapper.toDomain(comment.user),
    }));
  }
}
