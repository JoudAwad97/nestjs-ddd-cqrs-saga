import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentsQuery } from './get-comments.query';
import { Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY } from '@src/modules/interactions/comment/comment.di-tokens';
import { CommentRepositoryPort } from '@src/modules/interactions/comment/database/repository/comment.repository.port';
import { ICommentWithAuthorReadModel } from '@src/modules/interactions/comment/read-models/comment.types';
import { UserRepositoryContract } from '@src/shared/contract/user.contract';
import { USER_REPOSITORY } from '@src/modules/user-management/user/user.di-tokens';

@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryApplicationService
  implements IQueryHandler<FindCommentsQuery>
{
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryContract,
  ) {}

  async execute(): Promise<ICommentWithAuthorReadModel[]> {
    /**
     * In order to isolate each Module from direct query to the database of another module
     * we expose an interface that the other module must implement to return this information and then combine them together
     */
    const comments = await this.commentRepository.fetchComments();
    const commentUsers = await this.userRepository.findUsersByIds(
      comments.map((comment) => comment.authorId),
    );

    const commentWithAuthor: ICommentWithAuthorReadModel[] = comments.map(
      (comment, index) => {
        return {
          comment,
          author: commentUsers[index],
        };
      },
    );

    return commentWithAuthor;
  }
}