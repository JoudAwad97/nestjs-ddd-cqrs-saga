import { Module, Provider } from '@nestjs/common';
import { SendWelcomeEmailListener } from './presenters/listeners/send-welcome-email';
import { UserMapper } from '../user-management/user/infrastructure/prisma/mapper/user.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { NotificationInfrastructureModule } from './infrastructure/notification-infrastructure.module';

const httpControllers = [];
const messageControllers = [SendWelcomeEmailListener];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [UserMapper];

const libraries: Provider[] = [];

@Module({
  imports: [LoggerModule, PublisherModule, NotificationInfrastructureModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...eventHandlers,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class NotificationModule {}
