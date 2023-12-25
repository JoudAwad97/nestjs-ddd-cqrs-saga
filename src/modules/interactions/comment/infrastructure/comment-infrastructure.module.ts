import { Module } from '@nestjs/common';
import { CommentOrmModule } from './prisma/comment-orm.module';
import { UserOrmModule } from '@src/modules/user-management/user/infrastructure/prisma/user-orm.module';
import { UserRepositoryContract } from '@src/shared/application/contracts/user.contract';
import { PostOrmModule } from '@src/modules/content-management/post/infrastructure/prisma/post-orm.module';
import { PostRepositoryContract } from '@src/shared/application/contracts/post.contract';

const userOrmModule = UserOrmModule.useContracts([UserRepositoryContract]);
const postOrmModule = PostOrmModule.useContracts([PostRepositoryContract]);

@Module({
  imports: [CommentOrmModule, userOrmModule, postOrmModule],
  exports: [CommentOrmModule, userOrmModule, postOrmModule],
})
export class CommentInfrastructureModule {}
