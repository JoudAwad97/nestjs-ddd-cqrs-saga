import { InjectionToken, Module } from '@nestjs/common';
import { AuthorRepository } from './repository/author.repository';
import { AuthorRepositoryPort } from './repository/author.repository.port';
import { AuthorMapperPort } from './mapper/author.mapper.port';
import { AuthorMapper } from './mapper/author.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { UserOrmModule } from '@src/modules/user-management/user/infrastructure/prisma/user-orm.module';
import { generateUseContractsFunction } from '@src/shared/infrastructure/database-providers/utils';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: AuthorRepositoryPort,
      useExisting: AuthorRepository,
    },
    {
      provide: AuthorMapperPort,
      useExisting: AuthorMapper,
    },
    AuthorMapper,
    AuthorRepository,
  ],
  exports: [AuthorRepositoryPort, AuthorMapperPort],
})
export class AuthorORMModule {
  static useContracts(
    repositoryContracts: InjectionToken[] = [],
    mapperContracts: InjectionToken[] = [],
  ) {
    return generateUseContractsFunction<AuthorRepository, AuthorMapper>(
      UserOrmModule,
      AuthorRepository,
      AuthorMapper,
      repositoryContracts,
      mapperContracts,
    );
  }
}
