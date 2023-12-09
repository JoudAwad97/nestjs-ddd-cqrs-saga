import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import { UserRoles, UserStatuses } from '@src/modules/user/domain/user.types';

export class UserDto extends ResponseBase {
  name: string;

  status: UserStatuses;

  role: UserRoles;
}
