import { Logger, Module, Provider } from '@nestjs/common';
import {
  COMMENT_EVENT_PUBLISHER,
  COMMENT_MAPPER,
  COMMENT_REPOSITORY,
  USER_MAPPER,
} from './comment.di-tokens';
import { EventEmitter } from '@src/infrastructure/publisher';
import { CommentRepository } from './database/repository/comment.repository';
import { CommentMapper } from './database/mapper/comment.mapper';
import { UserMapper } from '../../user-management/user/database/mapper/user.mapper';
import {
  POST_MAPPER,
  POST_REPOSITORY,
} from '../../content-management/post/post.di-tokens';
import { PostRepository } from '../../content-management/post/database/repository/write/post.repository';
import { USER_REPOSITORY } from '../../user-management/user/user.di-tokens';
import { UserRepository } from '../../user-management/user/database/repository/user.repository';
import { CreateCommentHttpController } from './actions/commands/create-comment/create-comment.controller';
import { CreateCommentApplicationService } from './actions/commands/create-comment/create-comment.application.service';
import { PostMapper } from '../../content-management/post/database/mapper/post.mapper';
import { LOGGER } from '@src/constants';
import { GetCommentsHttpController } from './actions/queries/get-comments/get-comments.controller';
import { FindCommentsQueryApplicationService } from './actions/queries/get-comments/get-comments.application.service';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from '@src/libs/utils';

const httpControllers = [
  CreateCommentHttpController,
  GetCommentsHttpController,
];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [CreateCommentApplicationService];
const queryHandlers: Provider[] = [FindCommentsQueryApplicationService];

const mappers: Provider[] = [
  {
    provide: COMMENT_MAPPER,
    useClass: CommentMapper,
  },
  {
    provide: USER_MAPPER,
    useClass: UserMapper,
  },
  {
    provide: POST_MAPPER,
    useClass: PostMapper,
  },
  UserMapper,
  PostMapper,
];

const repositories: Provider[] = [
  {
    provide: COMMENT_REPOSITORY,
    useClass: CommentRepository,
  },
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const libraries: Provider[] = [
  {
    provide: LOGGER,
    useClass: Logger,
  },
  {
    provide: COMMENT_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

const services: Provider[] = [];

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
  ],
})
export class CommentModule {}
