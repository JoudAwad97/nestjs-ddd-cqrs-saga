import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { LOGGER } from '@src/shared/constants';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { UserService } from '@src/modules/user-management/user/domain/user.service';
import { USER_REPOSITORY } from '@src/modules/user-management/user/user.di-tokens';
import { SKIP_GLOBAL_AUTH_GUARD } from './decorators/skip-global-auth-guard.decorator';

const BaseGuard = AuthGuard('jwt');

@Injectable()
export class AuthenticationGuard extends BaseGuard {
  constructor(
    @Inject(LOGGER) private readonly logger: LoggerPort,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('AuthenticationGuard is running on request...');

    /**
     * This is a dummy implementation of the AuthenticationGuard
     * I did this in here to demonstrate how to use UserService to protect a route
     * in real world application consider using more advanced solution
     * where you define strategies and rules for each route
     */

    if (this.skipGlobalAuthGuard(context)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];

    if (!userId) {
      return false;
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      return false;
    }

    return new UserService().allowUserToAuthenticate(user);
  }

  private skipGlobalAuthGuard(context: ExecutionContext) {
    const skipGlobalAuthGuard = this.reflector.getAllAndOverride<boolean>(
      SKIP_GLOBAL_AUTH_GUARD,
      [context.getHandler(), context.getClass()],
    );
    return skipGlobalAuthGuard;
  }
}
