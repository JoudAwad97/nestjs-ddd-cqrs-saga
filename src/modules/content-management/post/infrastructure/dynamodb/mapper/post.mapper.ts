import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../../domain/post.entity';
import { PostMapperPort } from './post.mapper.port';
import { PostResponseDto } from '../../../presenters/dtos/post.dto';
import { PostStatus } from '../../../domain/value-objects/status.value-objects';
import { PostStatuses } from '../../../domain/post.types';
import {
  PostDynamoDBModel,
  postDynamoDBSchema,
} from '../../dynamodb/schema/post.schema';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
@Injectable()
export class PostMapper implements PostMapperPort {
  /**
   * Convert Domain Entity into Database Record
   */
  toPersistence(entity: PostEntity): PostDynamoDBModel {
    const copy = entity.getProps();
    const record: PostDynamoDBModel = {
      created_at: copy.createdAt.toISOString(),
      pk: copy.id,
      title: copy.title,
      content: copy.content,
      author_id: copy.authorId,
      status: copy.status.getStatus() as PostStatuses,
      updated_at: copy.updatedAt.toISOString(),
    };
    return postDynamoDBSchema.parse(record);
  }

  /**
   * Convert Database Record into Domain Entity
   */
  toDomain(record: PostDynamoDBModel): PostEntity {
    const entity = new PostEntity({
      id: record.pk,
      createdAt: new Date(record.created_at),
      updatedAt: new Date(record.updated_at),
      props: {
        authorId: record.author_id,
        content: record.content,
        title: record.title,
        /**
         * Either create a mapper per instance
         * or enforce the typing
         */
        status: new PostStatus({ status: record.status as PostStatuses }),
      },
    });
    return entity;
  }

  /**
   * Convert Domain Entity into Response DTO
   * this can be helpful to determine what information you are returning to the client.
   */
  toResponse(entity: PostEntity): PostResponseDto {
    const props = entity.getProps();
    const response = new PostResponseDto(entity);
    response.content = props.content;
    response.title = props.title;
    return response;
  }
}
