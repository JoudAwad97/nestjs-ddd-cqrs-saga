import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { POST_PROJECTION } from '../../post.di-tokens';
import { PostProjection } from '../projection/post/post.projection';
import { PostDeletedEvent } from '../../domain/events/post-deleted.event';
import { LOGGER } from '@src/shared/constants';

@EventsHandler(PostDeletedEvent)
export class PostDeletedEventHandler
  implements IEventHandler<PostDeletedEvent>
{
  constructor(
    private readonly logger: LoggerPort,
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
