import { PostEntity } from '../../domain/post.entity';
import { PostDynamoDBModel } from '../schema/post.dynamo.schema';

export interface PostMapperPort {
  // add more mapping functionalities in here as needed
  toDomainFromDynamoDB(record: PostDynamoDBModel): PostEntity;
}
