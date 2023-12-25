import { Module } from '@nestjs/common';
import { ReportOrmModule } from './prisma/report-orm.module';

@Module({
  imports: [ReportOrmModule],
  exports: [ReportOrmModule],
})
export class ReportInfrastructureModule {}
