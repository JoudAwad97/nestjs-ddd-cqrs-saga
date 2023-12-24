import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { COMMENT_MAPPER } from '../../../../comment.di-tokens';
import { CommentMapperPort } from '../../../../infrastructure/prisma/mapper/comment.mapper.port';
import { QueryBus } from '@nestjs/cqrs';
import { FindPostCommentsQuery } from './get-post-comments.query';
import {
  CommentWithAuthorResponseDto,
  CommentsForPostResponseDto,
} from '../../../dtos/comment-with-author.dto';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { Paginated } from '@src/libs/ports/repository.port';

@Controller('comment')
export class GetPostCommentsHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
  ) {}

  @Get('/post/:postId')
  async getPostComments(
    @Param('postId') postId: string,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<CommentsForPostResponseDto> {
    const { page, limit = 20 } = queryParams;

    const query = new FindPostCommentsQuery({
      postId,
      limit,
      page,
    });

    const comments: Paginated<CommentWithAuthorResponseDto> =
      await this.queryBus.execute(query);

    return comments;
  }
}
