import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { AuthorResponseDto } from '@src/shared-kernels/author/persistence/dtos/author.db.dto';

export class PostResponseDto extends ResponseBase {
  content: string;
  title: string;
  author: AuthorResponseDto;
}
