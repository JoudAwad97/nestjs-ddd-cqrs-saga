import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { POST_LOGGER, POST_REPOSITORY } from '../../post.di-tokens';
import { PostRepositoryPort } from '../../database/repository/write/post.repository.port';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { UserDeletedIntegrationEvent } from '@src/shared/events/user-deleted.integration.event';

interface DeleteAuthorPostsPayload {
  id: string;
}

@Controller()
export class DeleteAuthorPostsListener {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    @Inject(POST_LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @EventPattern(UserDeletedIntegrationEvent.name)
  async fetchUser(data: DeleteAuthorPostsPayload): Promise<void> {
    this.logger.log("Deleting author's posts...");
    await this.postRepository.deleteAuthorPosts(data.id);
  }
}
