import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_MAPPER } from '../../comment.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentModel } from '../schema/comment.schema';
import { CommentRepositoryPort } from './comment.repository.port';
import { CommentMapperPort } from '../mapper/comment.mapper.port';
import { LOGGER } from '@src/constants';

@Injectable()
export class CommentRepository
  extends BaseEntityRepository<CommentEntity, CommentModel>
  implements CommentRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Comment';
  protected prismaService: PrismaService;

  constructor(
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
    @Inject(LOGGER) protected readonly logger: ILoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  fetchComments(): Promise<CommentEntity[]> {
    return this.prismaService.comment
      .findMany()
      .then((result) => result.map(this.mapper.toDomain));
  }
}
