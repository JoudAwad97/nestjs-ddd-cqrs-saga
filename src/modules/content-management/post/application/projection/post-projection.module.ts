import { Module } from '@nestjs/common';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { AuthorProjection } from './author/author.projection';
import { PostProjection } from './post/post.projection';
import { AuthorProjectionPort } from './author/author.projection.port';
import { PostProjectionPort } from './post/post.projection.port';
import { PostDynamoDbModule } from '../../infrastructure/dynamodb/post-dynamo.module';

@Module({
  imports: [LoggerModule, PostDynamoDbModule],
  providers: [
    {
      provide: AuthorProjectionPort,
      useExisting: AuthorProjection,
    },
    {
      provide: PostProjectionPort,
      useExisting: PostProjection,
    },
    AuthorProjection,
    PostProjection,
  ],
  exports: [PostProjectionPort, AuthorProjectionPort],
})
export class PostProjectionModule {}
