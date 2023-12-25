import { Module, Provider } from '@nestjs/common';
import { SendWelcomeEmailListener } from './presenters/listeners/send-welcome-email';
import { UserMapper } from '../user-management/user/infrastructure/prisma/mapper/user.mapper';
import { TranslatorService } from './infrastructure/anti-corruption-layer/translator.service';
import { UserNotificationAdaptor } from './infrastructure/anti-corruption-layer/user/adaptar';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { UserOrmModule } from '../user-management/user/infrastructure/prisma/user-orm.module';
import { TranslatorServicePort } from './infrastructure/anti-corruption-layer/translator.service.port';
import { NotificationUserRepositoryContract } from './application/contracts/user.repository.contract';

const httpControllers = [];
const messageControllers = [SendWelcomeEmailListener];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [];

const libraries: Provider[] = [];

const translators: Provider[] = [
  {
    provide: TranslatorServicePort,
    useClass: TranslatorService,
  },
];

const adapters: Provider[] = [UserNotificationAdaptor];

@Module({
  imports: [
    LoggerModule,
    PublisherModule,
    UserOrmModule.useContracts([NotificationUserRepositoryContract]),
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
    ...translators,
    ...adapters,
  ],
})
export class NotificationModule {}
