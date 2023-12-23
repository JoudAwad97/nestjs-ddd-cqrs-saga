import { Controller, Get, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { CommentWithAuthorReadModel } from '@src/modules/interactions/comment/domain/read-models/comment.read-model';
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

    const results: CommentWithAuthorReadModel[] =
      await this.queryBus.execute(query);

    return results.map((result) => ({
      ...this.mapper.toResponseWithAuthor(result.comment, result.author),
    }));
  }
}
