import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLikeDto } from './create-like.dto';
import { CreateLikeCommand } from './create-like.command';
import { IdResponse } from '@src/libs/api/response/id.response.dto';
import { AggregateID } from '@src/libs/ddd';

@Controller('like')
export class CreatePostLikeHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  async createPostLike(@Body() body: CreateLikeDto) {
    return this.commandBus
      .execute(new CreateLikeCommand(body))
      .then((res: AggregateID) => new IdResponse(res));
  }
}
