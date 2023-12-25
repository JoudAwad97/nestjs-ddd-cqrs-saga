import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportCommand } from './create-report.command';
import { AggregateID } from '@src/libs/ddd';
import { ReportEntity } from '@src/modules/interactions/report/domain/report.entity';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { ReportRepositoryPort } from '@src/modules/interactions/report/infrastructure/prisma/repository/report.repository.port';

@CommandHandler(CreateReportCommand)
export class CreateReportCommandHandler
  implements ICommandHandler<CreateReportCommand, AggregateID>
{
  constructor(
    private readonly logger: LoggerPort,
    private readonly publisher: EventPublisher,
    private readonly reportRepository: ReportRepositoryPort,
  ) {}

  async execute(command: CreateReportCommand): Promise<AggregateID> {
    this.logger.log(`[CreateReportCommandHandler] Executing command...`);

    const report = ReportEntity.create({
      authorId: command.authorId,
      postId: command.postId,
    });

    const res = await this.reportRepository.create(report);

    report.publishEvents(this.publisher, this.logger);

    return res.id;
  }
}
