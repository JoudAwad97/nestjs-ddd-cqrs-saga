import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AggregateID } from '@src/libs/ddd';
import { CreateReportCommand } from './create-report.command';
import { CreateReportDto } from './create-report.dto';
import { IdResponse } from '@src/libs/api/response/id.response.dto';

@Controller('report')
export class createReportHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async createReport(@Body() body: CreateReportDto): Promise<IdResponse> {
    const command = new CreateReportCommand({
      authorId: body.authorId,
      postId: body.postId,
    });

    const res: AggregateID = await await this.commandBus.execute(command);

    return new IdResponse(res);
  }
}
