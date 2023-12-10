import { Controller, Get, Inject, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { FindUserQuery } from './find-user.query';
import { UserResponseDto } from '@src/modules/user/dtos/user.db.dto';
import { USER_MAPPER } from '@src/modules/comment/comment.di-tokens';
import { UserMapperPort } from '@src/modules/user/database/mapper/user.mapper.port';

@Controller('user')
export class FindUserHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(USER_MAPPER) private readonly mapper: UserMapperPort,
  ) {}

  @Get('/:id')
  async findUsers(@Param('id') id: string): Promise<UserResponseDto> {
    const findUsersQuery = new FindUserQuery({ userId: id });

    const userEntity: UserEntity = await this.queryBus.execute(findUsersQuery);

    return this.mapper.toResponse(userEntity);
  }
}
