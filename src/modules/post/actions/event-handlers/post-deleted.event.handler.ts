import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { POST_LOGGER, POST_PROJECTION } from '../../post.di-tokens';
import { PostProjection } from '../../projection/post.projection';
import { PostDeletedEvent } from '../../domain/events/post-deleted.event';

@EventsHandler(PostDeletedEvent)
export class PostDeletedEventHandler
  implements IEventHandler<PostDeletedEvent>
{
  constructor(
    @Inject(POST_LOGGER) private readonly logger: ILoggerPort,
    @Inject(POST_PROJECTION) private readonly postProjection: PostProjection,
  ) {}

  async handle(event: PostDeletedEvent) {
    this.logger.log('PostDeletedEventHandler.handle');
    await this.postProjection.projectPostDeleteFromReadDB(
      event.postId,
      event.authorId,
    );
  }
}
