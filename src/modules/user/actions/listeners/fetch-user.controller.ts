import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { UserListenerResponseDto } from '@src/shared/dto/user.listener.dto';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';
import { USER_FETCH_MESSAGE_PATTERN } from '@src/shared/constants/user-events.constants';
import { UserMapperPort } from '../../database/mapper/user.mapper.port';
import { USER_MAPPER } from '@src/modules/comment/comment.di-tokens';

interface FetchUserPayload {
  id: string;
}

@Controller()
export class UserFetchListener {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(USER_MAPPER) private readonly userMapper: UserMapperPort,
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
