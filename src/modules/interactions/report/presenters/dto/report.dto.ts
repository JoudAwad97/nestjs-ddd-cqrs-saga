import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { PostResponseWithoutAuthorDto } from '@src/modules/content-management/post/presenters/dtos/post.dto';
import { AuthorResponseDto } from '@src/shared-kernels/author/persistence/dtos/author.db.dto';

export class ReportResponseDto extends ResponseBase {
  authorId: string;
  postId: string;
}

export class ReportDetailResponseDto extends ReportResponseDto {
  author: AuthorResponseDto;
  post: PostResponseWithoutAuthorDto;
}
