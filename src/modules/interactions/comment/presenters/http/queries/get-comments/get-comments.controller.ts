import { Controller, Get, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { CommentWithAuthorResponseDto } from '@src/modules/interactions/comment/presenters/dtos/comment-with-author.dto';
import { COMMENT_MAPPER } from '@src/modules/interactions/comment/comment.di-tokens';
import { CommentMapperPort } from '@src/modules/interactions/comment/infrastructure/prisma/mapper/comment.mapper.port';

@Controller('comment')
export class GetCommentsHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(COMMENT_MAPPER) protected readonly mapper: CommentMapperPort,
  ) {}

  @Get('/')
  async getComments(): Promise<CommentWithAuthorResponseDto[]> {
    const query = new FindCommentsQuery();
    return this.queryBus.execute(query);
  }
}
