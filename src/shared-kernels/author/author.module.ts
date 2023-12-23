import { Logger, Module, Provider } from '@nestjs/common';
import { AuthorMapper } from './database/prisma/mapper/author.mapper';
import { AUTHOR_MAPPER, AUTHOR_REPOSITORY } from './author.di-tokens';
import { AuthorRepository } from './database/prisma/repository/author.repository';
import { CreateAuthorListener } from './persistence/listeners/create-author.controller';
import { UpdateAuthorListener } from './persistence/listeners/update-author.controller';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from '@src/libs/utils';
import { LOGGER } from '@src/shared/constants';

const httpControllers = [];
const messageControllers = [CreateAuthorListener, UpdateAuthorListener];
const graphqlResolvers: Provider[] = [];

const sagas: Provider[] = [];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];

const mappers: Provider[] = [
  AuthorMapper,
  {
    provide: AUTHOR_MAPPER,
    useClass: AuthorMapper,
  },
];

const repositories: Provider[] = [
  {
    provide: AUTHOR_REPOSITORY,
    useClass: AuthorRepository,
  },
];

const libraries: Provider[] = [
  {
    provide: LOGGER,
    useClass: Logger,
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
          ...generateRabbitMQConfigurations(false),
        },
      ],
    }),
  ],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...sagas,
    ...libraries,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...repositories,
  ],
  exports: [...mappers],
})
export class AuthorModule {}
