import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';
import { LikeEntity } from '../../../domain/like.entity';
import {
  LikeDetailedResponseDto,
  LikeResponseDto,
} from '../../../presenters/dtos/like.dto';
import { LikeModel } from '../schema/like.schema';
import { LikeMapperPort } from './like.mapper.port';

export class LikeMapper implements LikeMapperPort {
  toResponse(entity: LikeEntity): LikeResponseDto {
    const response = new LikeResponseDto({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    response.authorId = entity.getProps().authorId;
    response.postId = entity.getProps().postId;
    return response;
  }

  toPersistence(entity: LikeEntity): LikeModel {
    const copy = entity.getProps();
    const record: LikeModel = {
      author_id: copy.authorId,
      created_at: copy.createdAt,
      id: copy.id,
      post_id: copy.postId,
      updated_at: copy.updatedAt,
    };
    return record;
  }

  toDomain(record: LikeModel): LikeEntity {
    const entity = new LikeEntity({
      id: record.id,
      props: {
        authorId: record.author_id,
        postId: record.post_id,
      },
      createdAt: record.created_at,
      updatedAt: record.updated_at,
    });
    return entity;
  }

  toDetailedResponse(
    like: LikeModel,
    author: AuthorDatabaseModel,
  ): LikeDetailedResponseDto {
    const response = new LikeDetailedResponseDto({
      createdAt: like.created_at,
      id: like.id,
      updatedAt: like.updated_at,
    });

    // map the author of each like
    response.author = {
      id: author.id,
      firstName: author.first_name,
      lastName: author.last_name,
      nickName: author.nick_name,
      createdAt: author.created_at.toDateString(),
      updatedAt: author.updated_at.toDateString(),
    };
    return response;
  }
}
