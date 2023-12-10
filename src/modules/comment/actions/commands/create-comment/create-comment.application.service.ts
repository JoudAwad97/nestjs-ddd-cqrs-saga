import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../create-comment/create-comment.command';
import { Inject } from '@nestjs/common';
import {
  COMMENT_EVENT_PUBLISHER,
  COMMENT_REPOSITORY,
} from '../../../comment.di-tokens';
import { CommentRepositoryPort } from '../../../database/repository/comment.repository.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { AggregateID } from '@src/libs/ddd';
import { CommentEntity } from '../../../domain/comment.entity';
import { LOGGER } from '@src/constants';
import { POST_REPOSITORY } from '@src/modules/post/post.di-tokens';
import { UserRepositoryPort } from '@src/modules/user/database/repository/user.repository.port';
import { PostRepositoryPort } from '@src/modules/post/database/repository/write/post.repository.port';
import { commentDomainService } from '../../../domain/comment.service';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';

@CommandHandler(CreateCommentCommand)
export class CreateCommentApplicationService
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(COMMENT_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}

  async execute(command: CreateCommentCommand): Promise<AggregateID> {
    /**
     * MODULAR MONOLITH COMMUNICATION
     * METHOD 2: Use Method Calls for communication
     * This will allow you to invoke methods in-memory
     * this will be shared between modules it is easy and fast
     * but add coupling to your code at run-time
     * keep in mind that using this approach is totally fine
     * but you still need to always use the "Port" and the interfaces
     * instead of using the actual implementation
     */
    const { authorId, content, postId } = command;

    const comment = CommentEntity.create({
      authorId,
      content,
      postId,
    });

    /**
     * validation for both post and author
     */
    const [author, post] = await Promise.all([
      this.userRepository.findById(authorId),
      this.postRepository.findById(postId),
    ]);

    // use domain service to check for complicated logic for validation
    commentDomainService.canCommentOnPost(comment, author, post);

    const result = await this.commentRepository.create(comment);
    comment.publishEvents(this.eventPublisher, this.logger);

    return result.id;
  }
}
