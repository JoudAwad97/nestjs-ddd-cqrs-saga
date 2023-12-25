import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRepositoryPort } from '@src/modules/user-management/user/infrastructure/prisma/repository/user.repository.port';
import { UserListenerResponseDto } from '@src/shared/application/dto/user.listener.dto';
import { USER_FETCH_MESSAGE_PATTERN } from '@src/shared/constants/user-events.constants';
import { UserMapperPort } from '../../infrastructure/prisma/mapper/user.mapper.port';

interface FetchUserPayload {
  id: string;
}

@Controller()
export class UserFetchListener {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly userMapper: UserMapperPort,
  ) {}

  @MessagePattern(USER_FETCH_MESSAGE_PATTERN)
  async fetchUser(
    data: FetchUserPayload,
  ): Promise<UserListenerResponseDto | null> {
    return this.userRepository
      .findById(data.id)
      .then((res) => (res ? this.userMapper.toListenerResponse(res) : null));
  }
}
