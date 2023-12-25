import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from './create-comment.command';
import { Inject } from '@nestjs/common';
import {
  COMMENT_EVENT_PUBLISHER,
  COMMENT_REPOSITORY,
} from '../../../../comment.di-tokens';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { AggregateID } from '@src/libs/ddd';
import { CommentEntity } from '../../../../domain/comment.entity';
import { POST_REPOSITORY } from '@src/modules/content-management/post/post.di-tokens';
import { commentDomainService } from '../../../../domain/comment.service';
import { USER_REPOSITORY } from '@src/modules/user-management/user/user.di-tokens';
import { UserRepositoryContract } from '@src/shared/application/contracts/user.contract';
import { PostRepositoryContract } from '@src/shared/application/contracts/post.contract';
import { CommentRepositoryPort } from '../../../../infrastructure/prisma/repository/comment.repository.port';

@CommandHandler(CreateCommentCommand)
export class CreateCommentApplicationService
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepositoryPort,
    private readonly logger: LoggerPort,
    @Inject(COMMENT_EVENT_PUBLISHER)
    private readonly eventPublisher: EventPublisher,
    /**
     * Notice how we share the contracts and not the actual implementation or ports
     */
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryContract,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryContract,
  ) {}

  async execute(command: CreateCommentCommand): Promise<AggregateID> {
    /**
     * MODULAR MONOLITH COMMUNICATION
     * METHOD 2: Use Method Calls for communication
     * This will allow you to invoke methods in-memory
     * this will be shared between modules it is easy and fast
     * but add coupling to your code at run-time
     * keep in mind that using this approach is totally fine
     * but you still need to always use the "Port/Contract" and the interfaces
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
