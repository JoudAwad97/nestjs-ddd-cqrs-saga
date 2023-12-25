import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchPostReportsQuery } from './fetch-post-report.query';
import { ReportDetailResponseDto } from '../../../dto/report.dto';
import { ReportRepositoryPort } from '@src/modules/interactions/report/infrastructure/prisma/repository/report.repository.port';
import { LoggerPort } from '@src/libs/ports/logger.port';

@QueryHandler(FetchPostReportsQuery)
export class FetchPostReportsQueryHandler
  implements IQueryHandler<FetchPostReportsQuery, ReportDetailResponseDto[]>
{
  constructor(
    private readonly logger: LoggerPort,
    private readonly reportRepository: ReportRepositoryPort,
  ) {}

  async execute(): Promise<ReportDetailResponseDto[]> {
    this.logger.log(`> FetchPostReportsQuery: fetching post reports`);

    return this.reportRepository.findDetailedReports();
  }
}
