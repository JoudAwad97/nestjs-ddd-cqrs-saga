import { Module } from '@nestjs/common';
import { UserRepositoryPort } from './repository/user.repository.port';
import { UserRepository } from './repository/user.repository';
import { UserMapperPort } from './mapper/user.mapper.port';
import { UserMapper } from './mapper/user.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
    {
      provide: UserMapperPort,
      useExisting: UserMapper,
    },
    UserMapper,
  ],
  exports: [UserRepositoryPort, UserMapperPort],
})
export class UserPrismaModule {}
