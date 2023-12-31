import { Injectable } from '@nestjs/common';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PrismaService } from '@src/shared/infrastructure/database-providers/prisma/prisma';
import { Prisma } from '@prisma/client';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { AuthorEntity } from '../../../domain/author.entity';
import { AuthorDatabaseModel } from '../schema/author.database.schema';
import { AuthorRepositoryPort } from './author.repository.port';
import { AuthorMapperPort } from '../mapper/author.mapper.port';

@Injectable()
export class AuthorRepository
  extends BaseEntityRepository<AuthorEntity, AuthorDatabaseModel, 'Author'>
  implements AuthorRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Author';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: AuthorMapperPort,
    protected readonly logger: LoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async updateAuthorWithConcurrency(
    author: AuthorEntity,
    timestamp: Date,
  ): Promise<void> {
    await this.prismaService.author.update({
      where: {
        id: author.id.toString(),
        version: author.getProps().version,
        updated_at: {
          lt: timestamp,
        },
      },
      data: {
        first_name: author.getProps().firstName,
        last_name: author.getProps().lastName,
        nick_name: author.getProps().nickName,
        updated_at: new Date(),
        version: { increment: 1 },
      },
    });
  }

  async findAuthorByUserId(userId: string): Promise<AuthorEntity | null> {
    return this.prismaService.author
      .findUnique({
        where: {
          user_id: userId,
        },
      })
      .then((res) => (res ? this.mapper.toDomain(res) : null));
  }
}
