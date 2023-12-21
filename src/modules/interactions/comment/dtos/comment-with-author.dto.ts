import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { UserResponseDto } from '@src/modules/user-management/user/dtos/user.db.dto';

export class CommentWithAuthorResponseDto extends ResponseBase {
  content: string;

  /**
   * Extending the User from Another Module will couple it with it
   * if we want to have different response for the user in the comment
   * we would create it is own response type with a mapper
   * ---
   * Another solution is to use the already created User Response DTO and use the mapper
   * from the same user module
   */
  user: UserResponseDto;
}
