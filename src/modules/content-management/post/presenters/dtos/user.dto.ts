import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';

export class UserDto extends ResponseBase {
  name: string;

  email: string;
}
