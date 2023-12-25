import { Module } from '@nestjs/common';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentRepository } from './repository/comment.repository';
import { CommentRepositoryPort } from './repository/comment.repository.port';
import { CommentMapperPort } from './mapper/comment.mapper.port';
import { AuthorORMModule } from '@src/shared-kernels/author/infrastructure/prisma/author-orm.module';

@Module({
  imports: [LoggerModule, AuthorORMModule],
  providers: [
    {
      provide: CommentRepositoryPort,
      useExisting: CommentRepository,
    },
    {
      provide: CommentMapperPort,
      useExisting: CommentMapper,
    },
    CommentMapper,
    CommentRepository,
  ],
  exports: [CommentMapperPort, CommentRepositoryPort],
})
export class CommentOrmModule {}
