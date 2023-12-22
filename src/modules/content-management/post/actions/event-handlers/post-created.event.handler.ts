import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IEventPublisherPort } from '@src/libs/ports/event-publisher.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { PostCreatedEvent } from '../../domain/events/post-created.event';
import { POST_EVENT_PUBLISHER, POST_PROJECTION } from '../../post.di-tokens';
import { PostProjection } from '../../projection/post/post.projection';
import { LOGGER } from '@src/constants';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    @Inject(POST_EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisherPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(POST_PROJECTION)
    private readonly postProjection: PostProjection,
  ) {}

  async handle(event: PostCreatedEvent): Promise<void> {
    this.logger.log('PostCreatedEventHandler.handle');
    await this.postProjection.projectPostToReadDB(event.post);
  }
}