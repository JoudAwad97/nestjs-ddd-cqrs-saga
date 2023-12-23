import { Controller, Get, Inject, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { Paginated } from '@src/libs/ports/repository.port';
import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';
import { UserPaginatedResponseDto } from '@src/modules/user-management/user/presenters/dtos/user.paginated.response.dto';
import { USER_MAPPER } from '@src/modules/interactions/comment/comment.di-tokens';
import { UserMapperPort } from '@src/modules/user-management/user/infrastructure/prisma/mapper/user.mapper.port';

@Controller('user')
export class FindUsersHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(USER_MAPPER) private readonly mapper: UserMapperPort,
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
