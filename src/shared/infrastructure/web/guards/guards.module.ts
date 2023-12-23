// generate me the module of authentication

import { Logger, Module, Provider } from '@nestjs/common';
import { AuthenticationGuard } from './global-authentication.guard';
import { USER_REPOSITORY } from '@src/modules/user-management/user/user.di-tokens';
import { UserRepository } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { UserMapper } from '@src/modules/user-management/user/infrastructure/prisma/mapper/user.mapper';
import { USER_MAPPER } from '@src/modules/interactions/comment/comment.di-tokens';
import { LOGGER } from '@src/shared/constants';

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const mappers: Provider[] = [
  {
    provide: USER_MAPPER,
    useClass: UserMapper,
  },
  UserMapper,
];

const guards: Provider[] = [
  {
    provide: APP_GUARD,
    useExisting: AuthenticationGuard,
  },
  AuthenticationGuard,
];

const libraries: Provider[] = [
  {
    provide: LOGGER,
    useClass: Logger,
  },
];

@Module({
  imports: [],
  providers: [...guards, ...repositories, ...mappers, ...libraries],
  exports: [],
})
export class GlobalGuardModule {}
