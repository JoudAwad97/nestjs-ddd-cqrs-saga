import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { Module, Provider } from '@nestjs/common';
import { ReportInfrastructureModule } from './infrastructure/report-infrastructure.module';
import { FetchPostReportsHttpController } from './presenters/http/queries/fetch-post-report/fetch-post-report.controller';
import { FetchPostReportsQueryHandler } from './presenters/http/queries/fetch-post-report/fetch-post-report.service';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';

const httpControllers = [FetchPostReportsHttpController];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [FetchPostReportsQueryHandler];

@Module({
  imports: [PublisherModule, ReportInfrastructureModule, LoggerModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class ReportModule {}
