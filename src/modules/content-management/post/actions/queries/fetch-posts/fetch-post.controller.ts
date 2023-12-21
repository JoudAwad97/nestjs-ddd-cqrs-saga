import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PostResponseDto } from '@src/modules/content-management/post/dtos/post.dto';
import { FindPostsQuery } from './fetch-post.query';

@Controller('post')
export class FetchPostsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/')
  async fetchPost(): Promise<PostResponseDto[]> {
    const query = new FindPostsQuery();

    return this.queryBus.execute(query);
  }
}
