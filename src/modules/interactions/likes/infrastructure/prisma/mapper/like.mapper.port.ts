import { Mapper } from '@src/libs/ddd';
import { LikeEntity } from '../../../domain/like.entity';
import { LikeModel } from '../schema/like.schema';
import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';
import {
  LikeDetailedResponseDto,
  LikeResponseDto,
} from '../../../presenters/dtos/like.dto';

export abstract class LikeMapperPort extends Mapper<
  LikeEntity,
  LikeModel,
  LikeResponseDto
> {
  abstract toDetailedResponse(
    likeRecord: LikeModel,
    authorRecord: AuthorDatabaseModel,
  ): LikeDetailedResponseDto;
}
