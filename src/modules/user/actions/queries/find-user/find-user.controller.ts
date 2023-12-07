import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { UserMapper } from '@src/modules/user/database/mapper/user.mapper';
import { FindUserQuery } from './find-user.query';
import { UserResponseDto } from '@src/modules/user/dtos/user.dto';

@Controller('user')
export class FindUserHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: UserMapper,
  ) {}

  @Get('/:id')
  async findUsers(@Param('id') id: string): Promise<UserResponseDto> {
    const findUsersQuery = new FindUserQuery({ userId: id });

    const userEntity: UserEntity = await this.queryBus.execute(findUsersQuery);

    return this.mapper.toResponse(userEntity);
  }
}
