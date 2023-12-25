import { Module, Provider } from '@nestjs/common';
import { GetCommentsHttpController } from './presenters/http/queries/get-comments/get-comments.controller';
import { FindCommentsQueryApplicationService } from './presenters/http/queries/get-comments/get-comments.application.service';
import { AuthorModule } from '@src/shared-kernels/author/author.module';
import { GetPostCommentsHttpController } from './presenters/http/queries/get-post-comments/get-post-comments.controller';
import { FindPostCommentsQueryApplicationService } from './presenters/http/queries/get-post-comments/get-post-comments.application.service';
import { CreateCommentHttpController } from './presenters/http/commands/create-comment/create-comment.controller';
import { CreateCommentApplicationService } from './presenters/http/commands/create-comment/create-comment.application.service';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { CommentInfrastructureModule } from './infrastructure/comment-infrastructure.module';

const httpControllers = [
  CreateCommentHttpController,
  GetCommentsHttpController,
  GetPostCommentsHttpController,
];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [CreateCommentApplicationService];
const queryHandlers: Provider[] = [
  FindCommentsQueryApplicationService,
  FindPostCommentsQueryApplicationService,
];

const libraries: Provider[] = [];

const services: Provider[] = [];

@Module({
  imports: [
    PublisherModule,
    AuthorModule,
    LoggerModule,
    CommentInfrastructureModule,
  ],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...eventHandlers,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...services,
  ],
})
export class CommentModule {}
