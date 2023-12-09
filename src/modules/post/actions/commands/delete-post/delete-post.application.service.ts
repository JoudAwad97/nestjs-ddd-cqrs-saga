import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { Inject } from '@nestjs/common';
import { PostRepositoryPort } from '@src/modules/post/database/repository/write/post.repository.port';
import {
  POST_EVENT_PUBLISHER,
  POST_LOGGER,
  POST_REPOSITORY,
} from '@src/modules/post/post.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';

@CommandHandler(DeletePostCommand)
export class DeletePostApplicationService
  implements ICommandHandler<DeletePostCommand>
{
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    @Inject(POST_LOGGER) private readonly logger: ILoggerPort,
    @Inject(POST_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
  ) {}

  async execute(command: DeletePostCommand): Promise<void> {
    const { postId } = command;

    const post = await this.postRepository.findById(postId);

    post.delete();

    this.logger.log('DeletePostApplicationService.execute');
    await this.postRepository.delete(postId);

    post.publishEvents(this.eventPublisher, this.logger);
  }
}
