import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { UserMapper } from '@src/modules/user/database/mapper/user.mapper';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { UserDatabaseModel } from '../schema/user.database.schema';
import { UserRepositoryPort } from './user.repository.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { Paginated } from '@src/libs/ports/repository.port';
import { orderByFieldExtractor } from '@src/libs/utils';
import { LOGGER } from '@src/constants';
import { UserRepositoryContract } from '@src/shared/contract/user.contract';

@Injectable()
export class UserRepository
  extends BaseEntityRepository<UserEntity, UserDatabaseModel>
  implements UserRepositoryPort, UserRepositoryContract
{
  protected modelName: Prisma.ModelName = 'User';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: UserMapper,
    @Inject(LOGGER) protected readonly logger: ILoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async fetchPaginatedUsers(
    input: PaginatedQueryBase,
  ): Promise<Paginated<UserEntity>> {
    // if the database we are using require different pagination input make sure to create a mapper
    const { limit, offset, page, orderBy } = input;

    const [result, count] = await Promise.all([
      this.prismaService.user.findMany({
        take: limit,
        skip: offset,
        orderBy: orderByFieldExtractor('User', orderBy.field, orderBy.param),
      }),
      this.prismaService.user.count({}),
    ]);

    return {
      data: result.map(this.mapper.toDomain),
      count,
      page,
      limit,
    };
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    const persistenceUser = this.mapper.toPersistence(user);
    return this.prismaService.user
      .update({
        where: {
          id: user.id,
        },
        data: persistenceUser,
      })
      .then(this.mapper.toDomain);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    this.logger.log("Fetching user by email: '" + email + "'");
    const result = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!result) {
      this.logger.warn("User with email: '" + email + "' not found");
      return null;
    }

    return this.mapper.toDomain(result);
  }
}
