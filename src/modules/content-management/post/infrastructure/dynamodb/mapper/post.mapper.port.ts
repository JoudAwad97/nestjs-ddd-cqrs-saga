import { Mapper } from '@src/libs/ddd';
import { PostEntity } from '../../../domain/post.entity';
import { PostResponseDto } from '../../../presenters/dtos/post.dto';
import { PostDynamoDBModel } from '../../dynamodb/schema/post.schema';

export abstract class PostMapperPort extends Mapper<
  PostEntity,
  PostDynamoDBModel,
  PostResponseDto
> {
  // add more mapping functionalities in here as needed
}
