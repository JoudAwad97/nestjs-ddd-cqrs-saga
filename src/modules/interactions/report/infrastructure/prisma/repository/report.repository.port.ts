import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ReportEntity } from '../../../domain/report.entity';
import { ReportDetailResponseDto } from '../../../presenters/dto/report.dto';

export abstract class ReportRepositoryPort extends RepositoryPort<ReportEntity> {
  abstract findDetailedReports(): Promise<ReportDetailResponseDto[]>;
}
