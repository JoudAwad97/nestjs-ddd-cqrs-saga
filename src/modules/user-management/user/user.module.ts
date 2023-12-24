import { Logger, Module, Provider } from '@nestjs/common';
import { UserMapper } from './infrastructure/prisma/mapper/user.mapper';
import { USER_EVENT_PUBLISHER, USER_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './infrastructure/prisma/repository/user.repository';
import { CreateUserHttpController } from './presenters/http/commands/create-user/create-user.controller';
import { CreateUserApplicationService } from './presenters/http/commands/create-user/create-user.application.service';
import { EventEmitter } from '@src/shared/infrastructure/publisher';
import { UserCreatedSaga } from './application/sagas/user.saga';
import { SendWelcomeEmailApplicationService } from './presenters/http/commands/send-welcome-email/send-welcome-email.application.service';
import { UserAccountValidationApplicationService } from './presenters/http/commands/user-account-validation/user-account-validation.application.service';
import { DeleteUserApplicationService } from './presenters/http/commands/delete-user/delete-user.application.service';
import { DeleteUserHttpController } from './presenters/http/commands/delete-user/delete-user.controller';
import { UpdateUserHttpController } from './presenters/http/commands/update-user/update-user.controller';
import { UpdateUserApplicationService } from './presenters/http/commands/update-user/update-user.application.service';
import { FindUsersHttpController } from './presenters/http/queries/find-users/find-users.controller';
import { FindUsersQueryApplicationService } from './presenters/http/queries/find-users/find-users.application.service';
import { FindUserHttpController } from './presenters/http/queries/find-user/find-user.controller';
import { FindUserQueryApplicationService } from './presenters/http/queries/find-user/find-user.application.service';
import { UserCreatedEventHandler } from './application/event-handlers/user-created.event.handler';
import { UserFetchListener } from './presenters/listeners/fetch-user.controller';
import { UserDeletedEventHandler } from './application/event-handlers/user-deleted.event.handler';
import { LOGGER } from '@src/shared/constants';
import { USER_MAPPER } from '@src/modules/interactions/comment/comment.di-tokens';
import { UserUpdatedEventHandler } from './application/event-handlers/user-updated.event.handler';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { ClientsModule } from '@nestjs/microservices';
import { NotifySupervisorApplicationService } from './presenters/http/commands/notify-supervisor/notify-supervisor.application.service';
import { UserAckEventHandler } from './application/event-handlers/user-ack.event.handler';

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
  UserAckEventHandler,
];

const sagas: Provider[] = [UserCreatedSaga];

const commandHandlers: Provider[] = [
  CreateUserApplicationService,
  SendWelcomeEmailApplicationService,
  UserAccountValidationApplicationService,
  DeleteUserApplicationService,
  UpdateUserApplicationService,
  NotifySupervisorApplicationService,
];
const queryHandlers: Provider[] = [
  FindUsersQueryApplicationService,
  FindUserQueryApplicationService,
];

const mappers: Provider[] = [
  {
    provide: USER_MAPPER,
    useExisting: UserMapper,
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
