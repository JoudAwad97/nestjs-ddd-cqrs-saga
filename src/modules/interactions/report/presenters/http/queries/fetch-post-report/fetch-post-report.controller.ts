import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ReportDetailResponseDto } from '../../../dto/report.dto';
import { FetchPostReportsQuery } from './fetch-post-report.query';

@Controller('report')
export class FetchPostReportsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/')
  async fetchPostReports(): Promise<ReportDetailResponseDto[]> {
    const query = new FetchPostReportsQuery();

    return this.queryBus.execute(query);
  }
}
