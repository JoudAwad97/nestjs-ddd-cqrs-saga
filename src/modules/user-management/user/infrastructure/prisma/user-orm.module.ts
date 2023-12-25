import { InjectionToken, Module } from '@nestjs/common';
import { UserRepositoryPort } from './repository/user.repository.port';
import { UserRepository } from './repository/user.repository';
import { UserMapperPort } from './mapper/user.mapper.port';
import { UserMapper } from './mapper/user.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { generateUseContractsFunction } from '@src/shared/infrastructure/database-providers/utils';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: UserRepositoryPort,
      useExisting: UserRepository,
    },
    {
      provide: UserMapperPort,
      useExisting: UserMapper,
    },
    UserRepository,
    UserMapper,
  ],
  exports: [UserRepositoryPort, UserMapperPort],
})
export class UserOrmModule {
  static useContracts(
    repositoryContracts: InjectionToken[] = [],
    mapperContracts: InjectionToken[] = [],
  ) {
    return generateUseContractsFunction<UserRepository, UserMapper>(
      UserOrmModule,
      UserRepository,
      UserMapper,
      repositoryContracts,
      mapperContracts,
    );
  }
}
