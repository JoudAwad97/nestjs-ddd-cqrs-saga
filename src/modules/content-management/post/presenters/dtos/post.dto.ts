import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { AuthorResponseDto } from '@src/shared-kernels/author/persistence/dtos/author.db.dto';

export class PostResponseWithoutAuthorDto extends ResponseBase {
  content: string;
  title: string;
}

export class PostResponseDto extends PostResponseWithoutAuthorDto {
  author: AuthorResponseDto;
}
