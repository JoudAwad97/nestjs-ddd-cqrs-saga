import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';

export class AuthorResponseDto extends ResponseBase {
  id: string;

  firstName: string;

  lastName: string;

  nickName?: string;
}
