import { Module } from '@nestjs/common';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { ReportMapper } from './mapper/report.mapper';
import { ReportMapperPort } from './mapper/report.mapper.port';
import { ReportRepository } from './repository/report.repository';
import { ReportRepositoryPort } from './repository/report.repository.port';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: ReportMapperPort,
      useExisting: ReportMapper,
    },
    {
      provide: ReportRepositoryPort,
      useExisting: ReportRepository,
    },
    ReportRepository,
    ReportMapper,
  ],
  exports: [ReportMapperPort, ReportRepositoryPort],
})
export class ReportOrmModule {}
