import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PostResponseDto } from '@src/modules/content-management/post/dtos/post.dto';
import { FindPostsQuery } from './fetch-post.query';
import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';
import { PostMapper } from '@src/modules/content-management/post/database/mapper/post.mapper';

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
