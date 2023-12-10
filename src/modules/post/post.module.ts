import { DeletePostHttpController } from './actions/commands/delete-post/delete-post.controller';
import { Logger, Module, Provider } from '@nestjs/common';
import {
  POST_PROJECTION_REPOSITORY,
  POST_EVENT_PUBLISHER,
  POST_REPOSITORY,
  POST_PROJECTION,
} from './post.di-tokens';
import { EventEmitter } from '@src/infrastructure/publisher';
import { PostMapper } from './database/mapper/post.mapper';
import { CreatePostApplicationService } from './actions/commands/create-post/create-post.application.service';
import { PostRepository } from './database/repository/write/post.repository';
import { CreatePostHttpController } from './actions/commands/create-post/create-post.controller';
import { DeleteAuthorPostsListener } from './actions/listeners/user-deleted.listener';
import { DeletePostApplicationService } from './actions/commands/delete-post/delete-post.application.service';
import { PostProjectionRepository } from './database/repository/read/post.dynamo.repository';
import { DynamoDBService } from '@src/infrastructure/database-providers/dynamodb/dynamodb';
import { PostProjection } from './projection/post.projection';
import { PostCreatedEventHandler } from './actions/event-handlers/post-created.event.handler';
import { PostDeletedEventHandler } from './actions/event-handlers/post-deleted.event.handler';
import { FetchPostsHttpController } from './actions/queries/fetch-posts/fetch-post.controller';
import { FindPostsQueryApplicationService } from './actions/queries/fetch-posts/fetch-post.application.service';
import { LOGGER } from '@src/constants';

const httpControllers = [
  CreatePostHttpController,
  DeletePostHttpController,
  FetchPostsHttpController,
];
const messageControllers = [DeleteAuthorPostsListener];
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

const mappers: Provider[] = [PostMapper];

const repositories: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
  {
    provide: POST_PROJECTION_REPOSITORY,
    useClass: PostProjectionRepository,
  },
];

const projections: Provider[] = [
  {
    provide: POST_PROJECTION,
    useClass: PostProjection,
  },
];

const libraries: Provider[] = [
  {
    provide: LOGGER,
    useClass: Logger,
  },
  {
    provide: POST_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

const services: Provider[] = [DynamoDBService];

@Module({
  imports: [],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...eventHandlers,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...repositories,
    ...services,
    ...projections,
  ],
})
export class PostModule {}
