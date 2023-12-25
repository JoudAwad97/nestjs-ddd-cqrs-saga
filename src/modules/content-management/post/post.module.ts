import { DeletePostHttpController } from './presenters/http/commands/delete-post/delete-post.controller';
import { Module, Provider } from '@nestjs/common';
import { CreatePostApplicationService } from './presenters/http/commands/create-post/create-post.application.service';
import { CreatePostHttpController } from './presenters/http/commands/create-post/create-post.controller';
import { DeleteAuthorPostsListener } from './presenters/listeners/user-deleted.listener';
import { DeletePostApplicationService } from './presenters/http/commands/delete-post/delete-post.application.service';
import { PostCreatedEventHandler } from './application/event-handlers/post-created.event.handler';
import { PostDeletedEventHandler } from './application/event-handlers/post-deleted.event.handler';
import { FetchPostsHttpController } from './presenters/http/queries/fetch-posts/fetch-post.controller';
import { FindPostsQueryApplicationService } from './presenters/http/queries/fetch-posts/fetch-post.application.service';
import { AuthorModule } from '@src/shared-kernels/author/author.module';
import { CreateAuthorPostsListener } from './presenters/listeners/user-created.listener';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { PostInfrastructureModule } from './infrastructure/post-infrastructure.module';
import { PostProjectionModule } from './application/projection/post-projection.module';

const httpControllers = [
  CreatePostHttpController,
  DeletePostHttpController,
  FetchPostsHttpController,
];
const messageControllers = [
  DeleteAuthorPostsListener,
  CreateAuthorPostsListener,
];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [
  PostCreatedEventHandler,
  PostDeletedEventHandler,
];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [
  CreatePostApplicationService,
  DeletePostApplicationService,
];
const queryHandlers: Provider[] = [FindPostsQueryApplicationService];

const libraries: Provider[] = [];

const services: Provider[] = [];

@Module({
  imports: [
    PublisherModule,
    LoggerModule,
    AuthorModule,
    PostInfrastructureModule,
    PostProjectionModule,
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
export class PostModule {}
