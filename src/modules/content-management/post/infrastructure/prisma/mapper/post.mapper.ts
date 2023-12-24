import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../../domain/post.entity';
import { PostMapperPort } from './post.mapper.port';
import { PostStatus } from '../../../domain/value-objects/status.value-objects';
import { PostStatuses } from '../../../domain/post.types';
import { PostResponseDto } from '../../../presenters/dtos/post.dto';
import { PostModel, postSchema } from '../schema/post.schema';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
@Injectable()
export class PostMapper implements PostMapperPort {
  toResponse(entity: PostEntity): PostResponseDto {
    const props = entity.getProps();
    const response = new PostResponseDto(entity);
    response.content = props.content;
    response.title = props.title;
    return response;
  }

  /**
   * Convert Domain Entity into Database Record
   */
  toPersistence(entity: PostEntity): PostModel {
    const copy = entity.getProps();
    const record: PostModel = {
      author_id: copy.authorId,
      content: copy.content,
      created_at: new Date(entity.createdAt),
      updated_at: new Date(entity.updatedAt),
      id: entity.id,
      title: copy.title,
      status: copy.status.getStatus(),
    };
    return postSchema.parse(record);
  }

  /**
   * Convert Database Record into Domain Entity
   */
  toDomain(record: PostModel): PostEntity {
    const entity = new PostEntity({
      id: record.id,
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
}
