import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  AUTHOR_PROJECTION_REPOSITORY,
  POST_REPOSITORY,
} from '../../post.di-tokens';
import { PostRepositoryPort } from '../../database/repository/write/post.repository.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { UserDeletedIntegrationEvent } from '@src/shared/events/user-deleted.integration.event';
import { LOGGER } from '@src/constants';
import { AuthorProjectionRepositoryPort } from '../../database/repository/read/author/author.dynamo.repository.port';

interface DeleteAuthorPostsPayload {
  id: string;
}

@Controller()
export class DeleteAuthorPostsListener {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    @Inject(AUTHOR_PROJECTION_REPOSITORY)
    private readonly authorProjectionRepository: AuthorProjectionRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @EventPattern(UserDeletedIntegrationEvent.name)
  async fetchUser(data: DeleteAuthorPostsPayload): Promise<void> {
    this.logger.log("Deleting author's posts...");
    await Promise.all([
      this.postRepository.deleteAuthorPosts(data.id),
      this.authorProjectionRepository.delete(data.id),
    ]);
  }
}
