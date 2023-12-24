import { PaginatedResponseDto } from '@src/libs/api/response/paginated.http-response.base';
import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { AuthorResponseDto } from '@src/shared-kernels/author/persistence/dtos/author.db.dto';

export class LikeDetailedResponseDto extends ResponseBase {
  author: AuthorResponseDto;
}

export class LikeResponseDto extends ResponseBase {
  authorId: string;
  postId: string;
}

export class LikePaginatedResponseDto extends PaginatedResponseDto<LikeDetailedResponseDto> {
  readonly data: readonly LikeDetailedResponseDto[];
}
