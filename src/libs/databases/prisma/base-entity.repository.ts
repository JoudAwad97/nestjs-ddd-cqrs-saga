import { RepositoryPort } from 'src/libs/ports/repository.port';
import { PrismaService } from 'src/shared/infrastructure/database-providers/prisma/prisma';
import { ObjectLiteral } from 'src/libs/types';
import { LoggerPort } from 'src/libs/ports/logger.port';
import { Mapper } from 'src/libs/ddd/mapper.interface';
import { Prisma } from '@prisma/client';
import { AggregateRoot } from 'src/libs/ddd';

export abstract class BaseEntityRepository<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected modelName: Prisma.ModelName;
  protected readonly prismaService: PrismaService;

  constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly logger: LoggerPort,
  ) {}

  create(entity: Aggregate): Promise<Aggregate> {
    return this.prismaService[this.modelName]
      .create({
        data: this.mapper.toPersistence(entity),
      })
      .then((result) => this.mapper.toDomain(result));
  }

  findById(id: string): Promise<Aggregate | null> {
    return this.prismaService[this.modelName]
      .findUnique({
        where: { id },
      })
      .then((result) => (result ? this.mapper.toDomain(result) : null));
  }

  delete(id: string): Promise<boolean> {
    return this.prismaService[this.modelName]
      .delete({
        where: { id },
      })
      .then((result) => !!result);
  }

  /**
   * Add More Methods as needed
   * all the methods that will be added here will be shared across all the repositories
   * if you want to have separate methods for a specific repository, you can add them in the repository port
   */
}
