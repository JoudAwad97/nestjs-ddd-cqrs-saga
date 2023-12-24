import { DeletePostHttpController } from './presenters/http/commands/delete-post/delete-post.controller';
import { Logger, Module, Provider } from '@nestjs/common';
import {
  POST_PROJECTION_REPOSITORY,
  POST_EVENT_PUBLISHER,
  POST_REPOSITORY,
  POST_PROJECTION,
  POST_MAPPER,
  AUTHOR_PROJECTION,
  AUTHOR_PROJECTION_REPOSITORY,
} from './post.di-tokens';
import { EventEmitter } from '@src/shared/infrastructure/publisher';
import { PostMapper } from './infrastructure/prisma/mapper/post.mapper';
import { CreatePostApplicationService } from './presenters/http/commands/create-post/create-post.application.service';
import { PostRepository } from './infrastructure/prisma/repository/post.repository';
import { CreatePostHttpController } from './presenters/http/commands/create-post/create-post.controller';
import { DeleteAuthorPostsListener } from './presenters/listeners/user-deleted.listener';
import { DeletePostApplicationService } from './presenters/http/commands/delete-post/delete-post.application.service';
import { PostProjectionRepository } from './infrastructure/dynamodb/repository/post/post.dynamo.repository';
import { DynamoDBService } from '@src/shared/infrastructure/database-providers/dynamodb/dynamodb';
import { PostProjection } from './application/projection/post/post.projection';
import { PostCreatedEventHandler } from './application/event-handlers/post-created.event.handler';
import { PostDeletedEventHandler } from './application/event-handlers/post-deleted.event.handler';
import { FetchPostsHttpController } from './presenters/http/queries/fetch-posts/fetch-post.controller';
import { FindPostsQueryApplicationService } from './presenters/http/queries/fetch-posts/fetch-post.application.service';
import { LOGGER } from '@src/shared/constants';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { AuthorProjection } from './application/projection/author/author.projection';
import { AuthorProjectionRepository } from './infrastructure/dynamodb/repository/author/author.dynamo.repository';
import { AuthorModule } from '@src/shared-kernels/author/author.module';
import { CreateAuthorPostsListener } from './presenters/listeners/user-created.listener';

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

const mappers: Provider[] = [
  {
    provide: POST_MAPPER,
    useClass: PostMapper,
  },
  PostMapper,
];

const repositories: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
  {
    provide: POST_PROJECTION_REPOSITORY,
    useClass: PostProjectionRepository,
  },
  // Author Related information
  {
    provide: AUTHOR_PROJECTION_REPOSITORY,
    useClass: AuthorProjectionRepository,
  },
];

const projections: Provider[] = [
  {
    provide: POST_PROJECTION,
    useClass: PostProjection,
  },
  {
    provide: AUTHOR_PROJECTION,
    useClass: AuthorProjection,
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
  imports: [
    ClientsModule.register({
      /**
       * TODO: IMPLEMENT DIFFERENT QUEUES FOR EACH USE CASE
       */
      clients: [
        {
          ...generateRabbitMQConfigurations(),
        },
      ],
    }),
    AuthorModule,
  ],
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
