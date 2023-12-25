import { PaginatedResponseDto } from '@src/libs/api/response/paginated.http-response.base';
import { PostResponseDto } from './post.dto';

export class PostPaginatedResponseDto extends PaginatedResponseDto<PostResponseDto> {
  readonly data: readonly PostResponseDto[];
}
