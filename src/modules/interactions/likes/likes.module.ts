import { Module, Provider } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { AuthorModule } from '@src/shared-kernels/author/author.module';
import {
  LIKES_EVENT_PUBLISHER,
  LIKES_REPOSITORY,
  LIKE_MAPPER,
} from './likes.di-tokens';
import { EventEmitter } from '@src/shared/infrastructure/publisher';
import { GetPostLikesHttpController } from './presenters/http/queries/get-likes-by-post/get-likes-by-post.controller';
import { GetPostLikesQueryApplicationService } from './presenters/http/queries/get-likes-by-post/get-likes-by-post.application.service';
import { LikeMapper } from './infrastructure/prisma/mapper/like.mapper';
import { LikeRepository } from './infrastructure/prisma/repository/like.repository';
import { LikeService } from './domain/like.service';
import { CreatePostLikeHttpController } from './presenters/http/commands/create-like/create-like.controller';
import { CreateLikeApplicationService } from './presenters/http/commands/create-like/create-like.application.service';
import { AuthorRepository } from '@src/shared-kernels/author/infrastructure/prisma/repository/author.repository';
import { AUTHOR_REPOSITORY } from '@src/shared-kernels/author/author.di-tokens';
import {
  POST_MAPPER,
  POST_REPOSITORY,
} from '@src/modules/content-management/post/post.di-tokens';
import { PostRepository } from '@src/modules/content-management/post/infrastructure/prisma/repository/post.repository';
import { PostMapper } from '@src/modules/content-management/post/infrastructure/prisma/mapper/post.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';

const httpControllers = [
  GetPostLikesHttpController,
  CreatePostLikeHttpController,
];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [
  GetPostLikesQueryApplicationService,
  CreateLikeApplicationService,
];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [
  {
    provide: LIKE_MAPPER,
    useExisting: LikeMapper,
  },
  {
    provide: POST_MAPPER,
    useExisting: PostMapper,
  },
  LikeMapper,
  PostMapper,
];

const repositories: Provider[] = [
  {
    provide: LIKES_REPOSITORY,
    useClass: LikeRepository,
  },
  {
    provide: AUTHOR_REPOSITORY,
    useClass: AuthorRepository,
  },
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
];

const libraries: Provider[] = [
  {
    provide: LIKES_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

const services: Provider[] = [LikeService];

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
    LoggerModule,
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
export class LikeModule {}
