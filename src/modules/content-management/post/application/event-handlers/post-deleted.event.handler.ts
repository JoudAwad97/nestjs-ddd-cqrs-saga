import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PostDeletedEvent } from '../../domain/events/post-deleted.event';
import { PostProjectionPort } from '../projection/post/post.projection.port';

@EventsHandler(PostDeletedEvent)
export class PostDeletedEventHandler
  implements IEventHandler<PostDeletedEvent>
{
  constructor(
    private readonly logger: LoggerPort,
    private readonly postProjection: PostProjectionPort,
  ) {}

  async handle(event: PostDeletedEvent) {
    this.logger.log('PostDeletedEventHandler.handle');
    await this.postProjection.projectPostDeleteFromReadDB(
      event.postId,
      event.authorId,
    );
  }
}
