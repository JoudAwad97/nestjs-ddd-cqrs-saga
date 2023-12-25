import { Logger, Module } from '@nestjs/common';
import { LoggerPort } from '@src/libs/ports/logger.port';

@Module({
  providers: [
    {
      provide: LoggerPort,
      useClass: Logger,
    },
  ],
  exports: [LoggerPort],
})
export class LoggerModule {}
