import { Module } from '@nestjs/common';
import { LikeOrmModule } from './prisma/like-orm.module';
import { PostOrmModule } from '@src/modules/content-management/post/infrastructure/prisma/post-orm.module';

@Module({
  imports: [LikeOrmModule, PostOrmModule],
  exports: [LikeOrmModule, PostOrmModule],
})
export class LikeInfrastructureModule {}
