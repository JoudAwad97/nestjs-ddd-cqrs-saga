import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { Paginated } from '@src/libs/ports/repository.port';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { UserMapper } from '@src/modules/user/database/mapper/user.mapper';
import { UserPaginatedResponseDto } from '@src/modules/user/dtos/user.paginated.response.dto';

@Controller('user')
export class FindUsersHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: UserMapper,
  ) {}

  @Get('/')
  async findUsers(
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const { page, limit } = queryParams;

    const findUsersQuery = new FindUsersQuery({
      limit,
      page,
    });

    const paginated: Paginated<UserEntity> =
      await this.queryBus.execute(findUsersQuery);

    return new UserPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map(this.mapper.toResponse),
    });
  }
}
