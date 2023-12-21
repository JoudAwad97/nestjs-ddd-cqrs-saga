import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';

export class UserResponseDto extends ResponseBase {
  firstName: string;

  lastName: string;

  nickName?: string;

  email: string;
}
