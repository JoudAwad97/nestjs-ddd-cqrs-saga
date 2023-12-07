import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { UserMapper } from '@src/modules/user/database/mapper/user.mapper';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { PrismaService } from '@src/infrastructure/database-providers/prisma/prisma';
import { UserModel } from '../schema/user.schema';
import { UserRepositoryPort } from './user.repository.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { USER_LOGGER } from '../../user.di-tokens';

@Injectable()
export class UserRepository
  extends BaseEntityRepository<UserEntity, UserModel>
  implements UserRepositoryPort
{
  protected modelName: Prisma.ModelName = 'User';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: UserMapper,
    @Inject(USER_LOGGER) protected readonly logger: ILoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
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
