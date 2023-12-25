// generate me the module of authentication

import { Module, Provider } from '@nestjs/common';
import { AuthenticationGuard } from './global-authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from '../../logger/logger.module';
import { UserOrmModule } from '@src/modules/user-management/user/infrastructure/prisma/user-orm.module';

const guards: Provider[] = [
  {
    provide: APP_GUARD,
    useExisting: AuthenticationGuard,
  },
  AuthenticationGuard,
];

@Module({
  imports: [LoggerModule, UserOrmModule],
  providers: [...guards],
  exports: [],
})
export class GlobalGuardModule {}
