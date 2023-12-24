import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { Inject } from '@nestjs/common';
import { PostRepositoryPort } from '@src/modules/content-management/post/infrastructure/prisma/repository/post.repository.port';
import {
  POST_EVENT_PUBLISHER,
  POST_REPOSITORY,
} from '@src/modules/content-management/post/post.di-tokens';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { LOGGER } from '@src/shared/constants';

@CommandHandler(DeletePostCommand)
export class DeletePostApplicationService
  implements ICommandHandler<DeletePostCommand>
{
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    @Inject(LOGGER) private readonly logger: LoggerPort,
    @Inject(POST_EVENT_PUBLISHER)
    private readonly eventPublisher: EventPublisher,
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
