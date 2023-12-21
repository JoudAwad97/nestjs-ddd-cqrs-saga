import { Logger, Module, Provider } from '@nestjs/common';
import { UserMapper } from './database/mapper/user.mapper';
import { USER_EVENT_PUBLISHER, USER_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './database/repository/user.repository';
import { CreateUserHttpController } from './actions/commands/create-user/create-user.controller';
import { CreateUserApplicationService } from './actions/commands/create-user/create-user.application.service';
import { EventEmitter } from '@src/infrastructure/publisher';
import { UserCreatedSaga } from './sagas/user.saga';
import { SendWelcomeEmailApplicationService } from './actions/commands/send-welcome-email/send-welcome-email.application.service';
import { UserAccountValidationApplicationService } from './actions/commands/user-account-validation/user-account-validation.application.service';
import { DeleteUserApplicationService } from './actions/commands/delete-user/delete-user.application.service';
import { DeleteUserHttpController } from './actions/commands/delete-user/delete-user.controller';
import { UpdateUserHttpController } from './actions/commands/update-user/update-user.controller';
import { UpdateUserApplicationService } from './actions/commands/update-user/update-user.application.service';
import { FindUsersHttpController } from './actions/queries/find-users/find-users.controller';
import { FindUsersQueryApplicationService } from './actions/queries/find-users/find-users.application.service';
import { FindUserHttpController } from './actions/queries/find-user/find-user.controller';
import { FindUserQueryApplicationService } from './actions/queries/find-user/find-user.application.service';
import { UserCreatedEventHandler } from './actions/event-handlers/user-created.event.handler';
import { UserFetchListener } from './actions/listeners/fetch-user.controller';
import { UserDeletedEventHandler } from './actions/event-handlers/user-deleted.event.handler';
import { LOGGER } from '@src/constants';
import { USER_MAPPER } from '@src/modules/interactions/comment/comment.di-tokens';
import { UserUpdatedEventHandler } from './actions/event-handlers/user-updated.event.handler';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { ClientsModule } from '@nestjs/microservices';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  UpdateUserHttpController,
  FindUsersHttpController,
  FindUserHttpController,
];
const messageControllers = [UserFetchListener];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [
  UserCreatedEventHandler,
  UserUpdatedEventHandler,
  UserDeletedEventHandler,
];

const sagas: Provider[] = [UserCreatedSaga];

const commandHandlers: Provider[] = [
  CreateUserApplicationService,
  SendWelcomeEmailApplicationService,
  UserAccountValidationApplicationService,
  DeleteUserApplicationService,
  UpdateUserApplicationService,
];
const queryHandlers: Provider[] = [
  FindUsersQueryApplicationService,
  FindUserQueryApplicationService,
];

const mappers: Provider[] = [
  {
    provide: USER_MAPPER,
    useClass: UserMapper,
  },
  UserMapper,
];

const repositories: Provider[] = [
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
    provide: USER_EVENT_PUBLISHER,
    useClass: EventEmitter,
  },
];

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
  ],
})
export class UserModule {}
