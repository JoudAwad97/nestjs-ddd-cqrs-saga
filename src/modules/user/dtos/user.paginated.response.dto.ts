import { PaginatedResponseDto } from '@src/libs/api/response/paginated.http-response.base';
import { UserResponseDto } from './user.dto';

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  readonly data: readonly UserResponseDto[];
}
