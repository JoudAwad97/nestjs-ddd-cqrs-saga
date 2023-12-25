import { InjectionToken, Module } from '@nestjs/common';
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
    return {
      module: UserOrmModule,
      providers: [
        ...repositoryContracts.map((provider) => ({
          provide: provider,
          useExisting: UserRepository,
        })),
        ...mapperContracts.map((provider) => ({
          provide: provider,
          useExisting: UserMapper,
        })),
      ],
      exports: [...repositoryContracts, ...mapperContracts],
    };
  }
}
