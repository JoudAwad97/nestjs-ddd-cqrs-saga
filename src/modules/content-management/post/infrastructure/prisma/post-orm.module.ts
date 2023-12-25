import { InjectionToken, Module } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostMapper } from './mapper/post.mapper';
import { PostRepositoryPort } from './repository/post.repository.port';
import { PostMapperPort } from './mapper/post.mapper.port';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { generateUseContractsFunction } from '@src/shared/infrastructure/database-providers/utils';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: PostRepositoryPort,
      useExisting: PostRepository,
    },
    {
      provide: PostMapperPort,
      useExisting: PostMapper,
    },
    PostRepository,
    PostMapper,
  ],
  exports: [PostRepositoryPort, PostMapperPort],
})
export class PostOrmModule {
  static useContracts(
    repositoryContracts: InjectionToken[] = [],
    mapperContracts: InjectionToken[] = [],
  ) {
    return generateUseContractsFunction<PostRepository, PostMapper>(
      PostOrmModule,
      PostRepository,
      PostMapper,
      repositoryContracts,
      mapperContracts,
    );
  }
}
