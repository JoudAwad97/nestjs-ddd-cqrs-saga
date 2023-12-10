import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentRequestDto } from './create-comment.request.dto';
import { IdResponse } from '@src/libs/api/response/id.response.dto';
import { CreateCommentCommand } from './create-comment.command';
import { AggregateID } from '@src/libs/ddd';

@Controller('comment')
export class CreateCommentHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async createComment(
    @Body() body: CreateCommentRequestDto,
  ): Promise<IdResponse> {
    const command = new CreateCommentCommand(body);

    const result: AggregateID = await this.commandBus.execute(command);

    return new IdResponse(result);
  }
}
