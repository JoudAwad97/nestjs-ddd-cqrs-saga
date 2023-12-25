import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PostRepositoryPort } from '../../infrastructure/prisma/repository/post.repository.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserDeletedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-deleted.integration.event';
import { AuthorRepositoryPort } from '../../infrastructure/dynamodb/repository/author/author.dynamo.repository.port';

interface DeleteAuthorPostsPayload {
  id: string;
}

@Controller()
export class DeleteAuthorPostsListener {
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly authorProjectionRepository: AuthorRepositoryPort,
    private readonly logger: LoggerPort,
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
