import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { Module, Provider } from '@nestjs/common';
import { ReportInfrastructureModule } from './infrastructure/report-infrastructure.module';
import { FetchPostReportsHttpController } from './presenters/http/queries/fetch-post-report/fetch-post-report.controller';
import { FetchPostReportsQueryHandler } from './presenters/http/queries/fetch-post-report/fetch-post-report.service';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { CreateReportCommandHandler } from './presenters/http/commands/create-report/create-report.service';
import { createReportHttpController } from './presenters/http/commands/create-report/create-report.controller';

const httpControllers = [
  FetchPostReportsHttpController,
  createReportHttpController,
];

const commandHandlers: Provider[] = [CreateReportCommandHandler];
const queryHandlers: Provider[] = [FetchPostReportsQueryHandler];

@Module({
  imports: [PublisherModule, ReportInfrastructureModule, LoggerModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class ReportModule {}
