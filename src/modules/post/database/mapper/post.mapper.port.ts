import { Mapper } from '@src/libs/ddd';
import { PostEntity } from '../../domain/post.entity';
import { PostResponseDto } from '../../dtos/post.dto';
import { PostDynamoDBModel } from '../schema/post.dynamo.schema';
import { PostModel } from '../schema/post.schema';

export interface PostMapperPort
  extends Mapper<PostEntity, PostModel, PostResponseDto> {
  // add more mapping functionalities in here as needed
  toDomainFromDynamoDB(record: PostDynamoDBModel): PostEntity;
  toPersistenceDynamoDB(entity: PostEntity): PostDynamoDBModel;
}
