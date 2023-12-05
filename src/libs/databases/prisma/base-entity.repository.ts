import { RepositoryPort } from 'src/libs/ports/repository.port';
import { PrismaService } from 'src/infrastructure/database-providers/prisma/prisma';
import { Option } from 'oxide.ts';
import { ObjectLiteral } from 'src/libs/types';
import { ILoggerPort } from 'src/libs/ports/logger.port';
import { Mapper } from 'src/libs/ddd/mapper.interface';
import { Prisma } from '@prisma/client';
import { AggregateRoot } from 'src/libs/ddd';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class BaseEntityRepository<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected modelName: Prisma.ModelName;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: ILoggerPort,
    private readonly mapper: Mapper<Aggregate, DbModel>,
    modelName: Prisma.ModelName,
  ) {
    this.modelName = modelName;
  }

  async create(entity: Aggregate): Promise<Aggregate> {
    try {
      const result = await this.prismaService[this.modelName].create({
        data: this.mapper.toPersistence(entity),
      });
      return this.mapper.toDomain(result);
    } catch (error) {
      this.logger.error(`Error creating ${this.modelName} entity`);
      throw new InternalServerErrorException(error);
    }
  }

  findById(id: string): Promise<Option<Aggregate>> {
    try {
      return this.prismaService[this.modelName]
        .findUnique({
          where: { id },
        })
        .then((result) => (result ? this.mapper.toDomain(result) : null));
    } catch (error) {
      this.logger.error(`Error creating ${this.modelName} entity`);
      throw new InternalServerErrorException(error);
    }
  }

  delete(id: string): Promise<boolean> {
    try {
      return this.prismaService[this.modelName]
        .delete({
          where: { id },
        })
        .then((result) => !!result);
    } catch (error) {
      this.logger.error(`Error creating ${this.modelName} entity`);
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Add More Methods as needed
   * all the methods that will be added here will be shared across all the repositories
   * if you want to have separate methods for a specific repository, you can add them in the repository port
   */
}
