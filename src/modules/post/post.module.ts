import { Logger, Module, Provider } from '@nestjs/common';
import {
  POST_EVENT_PUBLISHER,
  POST_LOGGER,
  POST_REPOSITORY,
} from './post.di-tokens';
import { EventEmitter } from '@src/infrastructure/publisher';
import { PostMapper } from './database/mapper/post.mapper';
import { CreatePostApplicationService } from './actions/commands/create-post/create-post.application.service';
import { PostRepository } from './database/repository/post.repository';
import { CreatePostHttpController } from './actions/commands/create-post/create-post.controller';

const httpControllers = [CreatePostHttpController];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [CreatePostApplicationService];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [PostMapper];

const repositories: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
];

const libraries: Provider[] = [
  {
    provide: POST_LOGGER,
    useClass: Logger,
  },
  {
    provide: POST_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

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
  ],
})
export class PostModule {}
