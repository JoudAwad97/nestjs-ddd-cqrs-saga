import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { UserDto } from './user.dto';

export class PostResponseDto extends ResponseBase {
  content: string;
  title: string;

  user: UserDto;
}
