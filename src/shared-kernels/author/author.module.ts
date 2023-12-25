import { Module, Provider } from '@nestjs/common';
import { CreateAuthorListener } from './persistence/listeners/create-author.controller';
import { UpdateAuthorListener } from './persistence/listeners/update-author.controller';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { AuthorInfrastructureModule } from './infrastructure/author-infrastructure.module';

const httpControllers = [];
const messageControllers = [CreateAuthorListener, UpdateAuthorListener];
const graphqlResolvers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const libraries: Provider[] = [];

@Module({
  imports: [PublisherModule, LoggerModule, AuthorInfrastructureModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [AuthorInfrastructureModule],
})
export class AuthorModule {}
