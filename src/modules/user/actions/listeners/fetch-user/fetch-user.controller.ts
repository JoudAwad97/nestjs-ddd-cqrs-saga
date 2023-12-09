import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserMapper } from '@src/modules/user/database/mapper/user.mapper';
import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { UserListenerResponseDto } from '@src/shared/dto/user.listener.dto';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';
import { USER_FETCH_MESSAGE_PATTERN } from '@src/shared/constants/user-events.constants';

interface FetchUserPayload {
  id: string;
}

@Controller()
export class UserFetchListener {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly userMapper: UserMapper,
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
