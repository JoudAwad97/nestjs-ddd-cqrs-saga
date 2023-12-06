import { Logger, Module, Provider } from '@nestjs/common';
import { UserMapper } from './database/mapper/user.mapper';
import {
  USER_EVENT_PUBLISHER,
  USER_LOGGER,
  USER_REPOSITORY,
} from './user.di-tokens';
import { UserRepository } from './database/repository/user.repository';
import { CreateUserHttpController } from './actions/commands/create-user/create-user.controller';
import { CreateUserApplicationService } from './actions/commands/create-user/create-user.application.service';
import { EventEmitter } from '@src/infrastructure/publisher';

const httpControllers = [CreateUserHttpController];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const commandHandlers: Provider[] = [CreateUserApplicationService];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const libraries: Provider[] = [
  {
    provide: USER_LOGGER,
    useClass: Logger,
  },
  {
    provide: USER_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

@Module({
  imports: [],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...repositories,
  ],
})
export class UserModule {}
