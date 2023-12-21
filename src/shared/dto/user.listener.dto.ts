import { ResponseBase } from '@src/libs/api/response/response.rest-response.base';
import {
  UserRoles,
  UserStatuses,
} from '../../modules/user-management/user/domain/user.types';

export class UserListenerResponseDto extends ResponseBase {
  firstName: string;

  lastName: string;

  nickName?: string;

  status: UserStatuses;

  role: UserRoles;
}
