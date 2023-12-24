import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { GetPostLikesQuery } from './get-likes-by-post.query';
import { QueryBus } from '@nestjs/cqrs';

@Controller('like')
export class GetPostLikesHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/post/:postId')
  async getPostLikes(
    @Param('postId') postId: string,
    @Query() queryParams: PaginatedQueryRequestDto,
  ) {
    const { page, limit = 20 } = queryParams;

    const query = new GetPostLikesQuery({
      postId,
      page,
      limit,
    });

    return this.queryBus.execute(query);
  }
}
