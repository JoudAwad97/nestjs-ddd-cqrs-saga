import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IdResponse } from '@src/libs/api/response/id.response.dto';
import { AggregateID } from '@src/libs/ddd';
import { CreatePostRequestDto } from './create-post.request.dto';
import { CreatePostCommand } from './create-post.command';

@Controller('post')
export class CreatePostHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async createPost(@Body() body: CreatePostRequestDto): Promise<IdResponse> {
    const command = new CreatePostCommand(body);

    const result: AggregateID = await this.commandBus.execute(command);

    return new IdResponse(result);
  }
}
