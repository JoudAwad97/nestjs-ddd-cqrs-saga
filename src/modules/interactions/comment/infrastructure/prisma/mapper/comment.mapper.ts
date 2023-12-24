import { Inject, Injectable } from '@nestjs/common';
import { CommentEntity } from '../../../domain/comment.entity';
import { CommentModel } from '../schema/comment.schema';
import { CommentWithAuthorResponseDto } from '../../../presenters/dtos/comment-with-author.dto';
import { CommentMapperPort } from './comment.mapper.port';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { CommentResponseDto } from '../../../presenters/dtos/comment.dto';
import { UserResponseDto } from '@src/modules/user-management/user/presenters/dtos/user.db.dto';
import { AUTHOR_MAPPER } from '@src/shared-kernels/author/author.di-tokens';
import { AuthorMapperPort } from '@src/shared-kernels/author/infrastructure/prisma/mapper/author.mapper.port';
import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';

@Injectable()
export class CommentMapper implements CommentMapperPort {
  constructor(
    @Inject(AUTHOR_MAPPER) protected readonly authorMapper: AuthorMapperPort,
  ) {}

  toPersistence(entity: CommentEntity): CommentModel {
    const copy = entity.getProps();
    const record: CommentModel = {
      created_at: copy.createdAt,
      id: copy.id,
      content: copy.content,
      author_id: copy.authorId,
      post_id: copy.postId,
      updated_at: copy.updatedAt,
    };
    return record;
  }

  toDomain(record: CommentModel): CommentEntity {
    const entity = new CommentEntity({
      id: record.id,
      props: {
        content: record.content,
        authorId: record.author_id,
        postId: record.post_id,
      },
      createdAt: record.created_at,
      updatedAt: record.updated_at,
    });
    return entity;
  }

  toResponse(entity: CommentEntity): CommentResponseDto {
    const copy = entity.getProps();
    const response = new CommentResponseDto(entity);
    response.content = copy.content;
    return response;
  }

  databaseModelToResponseDto(
    comment: CommentModel,
    author: AuthorDatabaseModel,
  ): CommentWithAuthorResponseDto {
    return {
      content: comment.content,
      id: comment.id,
      createdAt: new Date(comment.created_at).toISOString(),
      updatedAt: new Date(comment.updated_at).toISOString(),
      user: this.authorMapper.toResponseFromPersistence(author),
    };
  }

  toResponseWithAuthor(
    comment: CommentEntity,
    user: UserEntity,
  ): CommentWithAuthorResponseDto {
    const commentCopy = comment.getProps();
    const userCopy = user.getProps();

    const response = new CommentWithAuthorResponseDto(comment);
    response.content = commentCopy.content;

    if (userCopy) {
      const userResponse = new UserResponseDto(user);
      userResponse.firstName = userCopy.firstName;
      userResponse.lastName = userCopy.lastName;
      userResponse.nickName = userCopy.nickName;

      response.user = userResponse;
    }

    return response;
  }
}
