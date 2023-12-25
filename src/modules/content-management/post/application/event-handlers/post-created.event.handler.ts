import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PostCreatedEvent } from '../../domain/events/post-created.event';
import { PostProjectionPort } from '../projection/post/post.projection.port';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    private readonly logger: LoggerPort,
    private readonly postProjection: PostProjectionPort,
  ) {}

  async handle(event: PostCreatedEvent): Promise<void> {
    this.logger.log('PostCreatedEventHandler.handle');
    await this.postProjection.projectPostToReadDB(event.post);
  }
}
