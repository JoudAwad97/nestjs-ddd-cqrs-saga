import { Module } from '@nestjs/common';
import { LikeRepository } from './repository/like.repository';
import { LikeMapper } from './mapper/like.mapper';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { LikesRepositoryPort } from './repository/like.repository.port';
import { LikeMapperPort } from './mapper/like.mapper.port';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: LikesRepositoryPort,
      useExisting: LikeRepository,
    },
    {
      provide: LikeMapperPort,
      useExisting: LikeMapper,
    },
    LikeRepository,
    LikeMapper,
  ],
  exports: [LikeMapperPort, LikesRepositoryPort],
})
export class LikeOrmModule {}
