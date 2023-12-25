import { Module } from '@nestjs/common';
import { PostMapper } from './mapper/post.mapper';
import { PostProjectionRepository } from './repository/post/post.dynamo.repository';
import { AuthorProjectionRepository } from './repository/author/author.dynamo.repository';
import { PostRepositoryPort } from './repository/post/post.dynamo.repository.port';
import { AuthorRepositoryPort } from './repository/author/author.dynamo.repository.port';
import { PostMapperPort } from './mapper/post.mapper.port';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { DynamoDBService } from '@src/shared/infrastructure/database-providers/dynamodb/dynamodb';
import { AuthorMapperContract } from '../../application/contracts/author.repository.contract';
import { AuthorORMModule } from '@src/shared-kernels/author/infrastructure/prisma/author-orm.module';

@Module({
  imports: [
    LoggerModule,
    AuthorORMModule.useContracts([], [AuthorMapperContract]),
  ],
  providers: [
    {
      provide: PostRepositoryPort,
      useExisting: PostProjectionRepository,
    },
    {
      provide: AuthorRepositoryPort,
      useExisting: AuthorProjectionRepository,
    },
    {
      provide: PostMapperPort,
      useExisting: PostMapper,
    },
    PostMapper,
    AuthorProjectionRepository,
    PostProjectionRepository,
    DynamoDBService,
  ],
  exports: [PostMapperPort, AuthorRepositoryPort, PostRepositoryPort],
})
export class PostDynamoDbModule {}
