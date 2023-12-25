import { Module, Provider } from '@nestjs/common';
import { CreateUserHttpController } from './presenters/http/commands/create-user/create-user.controller';
import { CreateUserApplicationService } from './presenters/http/commands/create-user/create-user.application.service';
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
import { UserUpdatedEventHandler } from './application/event-handlers/user-updated.event.handler';
import { NotifySupervisorApplicationService } from './presenters/http/commands/notify-supervisor/notify-supervisor.application.service';
import { UserAckEventHandler } from './application/event-handlers/user-ack.event.handler';
import { UserInfrastructureModule } from './infrastructure/user-infrastructure.module';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';

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

const libraries: Provider[] = [];

@Module({
  imports: [UserInfrastructureModule, LoggerModule, PublisherModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...eventHandlers,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
