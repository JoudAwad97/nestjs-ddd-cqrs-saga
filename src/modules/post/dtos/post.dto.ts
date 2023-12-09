import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';

export class PostResponseDto extends ResponseBase {
  content: string;

  title: string;
}
