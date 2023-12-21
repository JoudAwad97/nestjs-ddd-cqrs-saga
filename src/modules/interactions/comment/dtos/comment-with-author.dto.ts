import { PaginatedResponseDto } from '@src/libs/api/response/paginated.http-response.base';
import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { AuthorResponseDto } from '@src/shared-kernels/author/dtos/author.db.dto';

export class CommentWithAuthorResponseDto extends ResponseBase {
  content: string;
  user: AuthorResponseDto;
}

export class CommentsForPostResponseDto extends PaginatedResponseDto<CommentWithAuthorResponseDto> {
  readonly data: readonly CommentWithAuthorResponseDto[];
}
