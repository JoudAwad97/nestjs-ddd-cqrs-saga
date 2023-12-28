import { RepositoryPort } from 'src/libs/ports/repository.port';
import { PrismaService } from 'src/shared/infrastructure/database-providers/prisma/prisma';
import { ObjectLiteral } from 'src/libs/types';
import { LoggerPort } from 'src/libs/ports/logger.port';
import { Mapper } from 'src/libs/ddd/mapper.interface';
import { Prisma } from '@prisma/client';
import { AggregateRoot } from 'src/libs/ddd';

// create the default type for the prisma
type Models = keyof typeof Prisma.ModelName;

// currently we use the "findMany" & "findUnique" filters by passing values dynamically
type ArgsType<T extends Models> =
  Prisma.TypeMap['model'][T]['operations']['findMany']['args'];

// create the types for the where clause for each type "findMany" & "findUnique"
type WhereType<T extends Models> = NonNullable<ArgsType<T>['where']>;
type CursorType<T extends Models> = NonNullable<ArgsType<T>['cursor']>;
type TakeType<T extends Models> = NonNullable<ArgsType<T>['take']>;
type SkipType<T extends Models> = NonNullable<ArgsType<T>['skip']>;
type OrderByType<T extends Models> = NonNullable<ArgsType<T>['orderBy']>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type IncludeType<T extends Models> = NonNullable<ArgsType<T>['include']>;
type HasInclude<T extends Models> = 'include' extends keyof ArgsType<T>
  ? true
  : false;

type fullOptionsWithoutInclude<T extends Models> = [
  orderBy?: OrderByType<T>,
  take?: TakeType<T>,
  cursor?: CursorType<T>,
  skip?: SkipType<T>,
];

type fullOptionsWithInclude<T extends Models> = [
  include?: IncludeType<T>,
  ...fullOptionsWithoutInclude<T>,
];

export abstract class BaseEntityRepository<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
  T extends Prisma.ModelName,
> implements RepositoryPort<Aggregate>
{
  protected modelName: Prisma.ModelName;
  protected readonly prismaService: PrismaService;

  constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly logger: LoggerPort,
  ) {}

  async findWithFilters<Include extends boolean = HasInclude<T>>(
    filters: WhereType<T>,
    ...params: Include extends true
      ? fullOptionsWithInclude<T>
      : fullOptionsWithoutInclude<T>
  ): Promise<Aggregate[]> {
    const [include, orderBy, take, cursor, skip] = params as any;

    return this.prismaService[this.modelName].findMany({
      where: filters,
      ...(include && { include }),
      cursor,
      take,
      orderBy,
      skip,
    });
  }

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
