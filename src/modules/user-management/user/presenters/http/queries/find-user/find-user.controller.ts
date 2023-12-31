import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { FindUserQuery } from './find-user.query';
import { UserResponseDto } from '@src/modules/user-management/user/presenters/dtos/user.db.dto';
import { UserMapperPort } from '@src/modules/user-management/user/infrastructure/prisma/mapper/user.mapper.port';

@Controller('user')
export class FindUserHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: UserMapperPort,
  ) {}

  @Get('/:id')
  async findUsers(@Param('id') id: string): Promise<UserResponseDto> {
    const findUsersQuery = new FindUserQuery({ userId: id });

    const userEntity: UserEntity = await this.queryBus.execute(findUsersQuery);

    return this.mapper.toResponse(userEntity);
  }
}
