import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AUTHOR_PROJECTION_REPOSITORY } from '../../post.di-tokens';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { LOGGER } from '@src/shared/constants';
import { AuthorProjectionRepositoryPort } from '../../database/repository/read/author/author.dynamo.repository.port';
import { UserCreatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-created.integration.event';
import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

@Controller()
export class CreateAuthorPostsListener {
  constructor(
    @Inject(AUTHOR_PROJECTION_REPOSITORY)
    private readonly authorProjectionRepository: AuthorProjectionRepositoryPort,
    @Inject(LOGGER) private readonly logger: LoggerPort,
  ) {}

  @EventPattern(UserCreatedIntegrationEvent.name)
  async fetchUser(data: UserCreatedIntegrationEvent): Promise<void> {
    this.logger.log('Creating author in Read Projection...');

    const author = AuthorEntity.create({
      firstName: data.firstName,
      lastName: data.lastName,
      nickName: data.nickName,
      userId: data.userId,
    });

    await this.authorProjectionRepository.create(author);
  }
}
