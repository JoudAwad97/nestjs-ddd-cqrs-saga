import { UserResponseDto } from '@src/modules/user/dtos/user.db.dto';
import { UserModule } from './../../../user/user.module';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_MAPPER, USER_MAPPER } from '../../comment.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { CommentEntity } from '../../domain/comment.entity';
import { CommentModel } from '../schema/comment.schema';
import { CommentRepositoryPort } from './comment.repository.port';
import { CommentWithAuthor } from './comment.repository.types';
import { Mapper } from '@src/libs/ddd/mapper.interface';
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
    @Inject(USER_MAPPER)
    private readonly userMapper: Mapper<
      UserEntity,
      UserModule,
      UserResponseDto
    >,
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
    @Inject(LOGGER) protected readonly logger: ILoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchCommentWithAuthor(id: string): Promise<CommentWithAuthor> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    return {
      comment: this.mapper.toDomain(comment),
      author: this.userMapper.toDomain(comment.user),
    };
  }
}
