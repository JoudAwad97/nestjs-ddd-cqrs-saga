import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { Inject } from '@nestjs/common';
import { PostRepositoryPort } from '@src/modules/content-management/post/infrastructure/prisma/repository/post.repository.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';

@CommandHandler(DeletePostCommand)
export class DeletePostApplicationService
  implements ICommandHandler<DeletePostCommand>
{
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly logger: LoggerPort,
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
