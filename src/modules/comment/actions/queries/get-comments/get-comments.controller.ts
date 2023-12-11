import { Controller, Get, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { CommentWithAuthor } from '@src/modules/comment/interfaces/comment.types';
import { CommentWithAuthorResponseDto } from '@src/modules/comment/dtos/comment-with-author.dto';
import { COMMENT_MAPPER } from '@src/modules/comment/comment.di-tokens';
import { CommentMapperPort } from '@src/modules/comment/database/mapper/comment.mapper.port';

@Controller('comment')
export class GetCommentsHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
  ) {}

  @Get('/')
  async getComments(): Promise<CommentWithAuthorResponseDto[]> {
    const query = new FindCommentsQuery();

    const results: CommentWithAuthor[] = await this.queryBus.execute(query);

    return results.map((result) => ({
      ...this.mapper.toResponseWithAuthor(result.comment, result.author),
    }));
  }
}
