import { Module } from '@nestjs/common';
import { PostOrmModule } from './prisma/post-orm.module';
import { PostDynamoDbModule } from './dynamodb/post-dynamo.module';

@Module({
  imports: [PostOrmModule, PostDynamoDbModule],
  exports: [PostOrmModule, PostDynamoDbModule],
})
export class PostInfrastructureModule {}
