import { Mapper } from '@src/libs/ddd';
import { CommentEntity } from '../../../domain/comment.entity';
import { CommentWithAuthorResponseDto } from '../../../presenters/dtos/comment-with-author.dto';
import { CommentModel } from '../schema/comment.schema';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { CommentResponseDto } from '../../../presenters/dtos/comment.dto';
import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';
import { CommentWithAuthorReadModel } from '../../../domain/read-models/comment.read-model';

export abstract class CommentMapperPort extends Mapper<
  CommentEntity,
  CommentModel,
  CommentResponseDto
> {
  abstract toResponseWithAuthor(
    comment: CommentEntity,
    user: UserEntity,
  ): CommentWithAuthorResponseDto;
  abstract databaseModelToResponseDto(
    comment: CommentModel,
    author: AuthorDatabaseModel,
  ): CommentWithAuthorReadModel;
}
