import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PostResponseDto } from '@src/modules/post/dtos/post.dto';
import { FindPostsQuery } from './fetch-post.query';
import { PostEntity } from '@src/modules/post/domain/post.entity';
import { PostMapper } from '@src/modules/post/database/mapper/post.mapper';

@Controller('post')
export class FetchPostsHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly postMapper: PostMapper,
  ) {}

  @Get('/')
  async fetchPost(): Promise<PostResponseDto[]> {
    const query = new FindPostsQuery();

    const result: PostEntity[] = await this.queryBus.execute(query);

    return result.map(this.postMapper.toResponse);
  }
}
