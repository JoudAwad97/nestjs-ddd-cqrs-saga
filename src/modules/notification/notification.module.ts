import { Module, Provider } from '@nestjs/common';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { ClientsModule } from '@nestjs/microservices';
import { SendWelcomeEmailListener } from './presenters/listeners/send-welcome-email';
import { UserRepository } from '../user-management/user/infrastructure/prisma/repository/user.repository';
import {
  NOTIFICATION_TRANSLATOR_SERVICE,
  USER_REPOSITORY,
} from './notification.di-tokens';
import { UserMapper } from '../user-management/user/infrastructure/prisma/mapper/user.mapper';
import { TranslatorService } from './infrastructure/anti-corruption-layer/translator.service';
import { UserNotificationAdaptor } from './infrastructure/anti-corruption-layer/user/adaptar';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';

const httpControllers = [];
const messageControllers = [SendWelcomeEmailListener];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const libraries: Provider[] = [];

const translators: Provider[] = [
  {
    provide: NOTIFICATION_TRANSLATOR_SERVICE,
    useClass: TranslatorService,
  },
];

const adapters: Provider[] = [UserNotificationAdaptor];

@Module({
  imports: [
    LoggerModule,
    ClientsModule.register({
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
    ...translators,
    ...adapters,
  ],
})
export class NotificationModule {}
