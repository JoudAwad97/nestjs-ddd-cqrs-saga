import { Logger, Module, Provider } from '@nestjs/common';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { ClientsModule } from '@nestjs/microservices';
import { LOGGER } from '@src/constants';
import { SendWelcomeEmailListener } from './features/listeners/send-welcome-email';

const httpControllers = [];
const messageControllers = [SendWelcomeEmailListener];
const graphqlResolvers: Provider[] = [];

const eventHandlers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [];

const libraries: Provider[] = [
  {
    provide: LOGGER,
    useClass: Logger,
  },
];

@Module({
  imports: [
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
  ],
})
export class NotificationModule {}
