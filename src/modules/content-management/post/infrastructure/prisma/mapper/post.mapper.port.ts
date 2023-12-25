import { Mapper } from '@src/libs/ddd';
import { PostEntity } from '../../../domain/post.entity';
import { PostResponseDto } from '../../../presenters/dtos/post.dto';
import { PostModel } from '../schema/post.schema';

export abstract class PostMapperPort extends Mapper<
  PostEntity,
  PostModel,
  PostResponseDto
> {}
