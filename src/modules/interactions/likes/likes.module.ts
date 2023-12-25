import { Module, Provider } from '@nestjs/common';
import { AuthorModule } from '@src/shared-kernels/author/author.module';
import { GetPostLikesHttpController } from './presenters/http/queries/get-likes-by-post/get-likes-by-post.controller';
import { GetPostLikesQueryApplicationService } from './presenters/http/queries/get-likes-by-post/get-likes-by-post.application.service';
import { LikeService } from './domain/like.service';
import { CreatePostLikeHttpController } from './presenters/http/commands/create-like/create-like.controller';
import { CreateLikeApplicationService } from './presenters/http/commands/create-like/create-like.application.service';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { LikeInfrastructureModule } from './infrastructure/like-infrastructure.module';

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

const libraries: Provider[] = [];

const services: Provider[] = [LikeService];

@Module({
  imports: [
    PublisherModule,
    AuthorModule,
    LoggerModule,
    LikeInfrastructureModule,
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
export class LikeModule {}
