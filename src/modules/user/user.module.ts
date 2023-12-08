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
import { UserCreatedEventHandler } from './actions/event-handlers/user-created-event.handler';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  UpdateUserHttpController,
  FindUsersHttpController,
  FindUserHttpController,
];
const messageControllers = [];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [UserCreatedEventHandler];

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
