import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { LOGGER } from '@src/shared/constants';
import { LoggerPort } from 'src/libs/ports/logger.port';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  public constructor(@Inject(LOGGER) private readonly logger: LoggerPort) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
      errorFormat: 'colorless',
    });

    new PrismaClient().$extends({
      model: {
        $allModels: {
          getClass<T extends object>(this: T): new () => T {
            return class {
              /** Generic Implementation */
            } as any;
          },
        },
      },
    });
  }

  public async onModuleInit() {
    this.$on('query', this.logger.log.bind(this.logger));
    this.$on('info', this.logger.log.bind(this.logger));

    this.$on('warn', (evt) => {
      this.logger.warn(evt);
    });

    this.$on('error', (evt) => {
      this.logger.error(evt);
    });

    this.logger.log('Connecting to Postgres database ...');
    await this.$connect();
    this.logger.log('Postgres database connection established');
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}
