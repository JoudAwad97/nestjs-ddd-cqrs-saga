import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ReportEntity } from '../../../domain/report.entity';
import { ReportModel } from '../schema/report.schema';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/database-providers/prisma/prisma';
import { ReportMapperPort } from '../mapper/report.mapper.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { ReportRepositoryPort } from './report.repository.port';
import { ReportDetailResponseDto } from '../../../presenters/dto/report.dto';

@Injectable()
export class ReportRepository
  extends BaseEntityRepository<ReportEntity, ReportModel>
  implements ReportRepositoryPort
{
  protected modelName: Prisma.ModelName = 'Report';
  protected prismaService: PrismaService;

  constructor(
    protected readonly mapper: ReportMapperPort,
    protected readonly logger: LoggerPort,
  ) {
    super(mapper, logger);
    this.prismaService = new PrismaService(this.logger);
  }

  async findDetailedReports(): Promise<ReportDetailResponseDto[]> {
    return this.prismaService.report
      .findMany({
        include: {
          user: true,
          post: true,
        },
      })
      .then((reports) =>
        reports.map((report) =>
          this.mapper.toDetailResponseDto(report, report.user, report.post),
        ),
      );
  }
}
