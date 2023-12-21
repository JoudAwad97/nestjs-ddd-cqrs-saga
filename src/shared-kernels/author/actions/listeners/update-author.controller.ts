import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AUTHOR_REPOSITORY } from '../../author.di-tokens';
import { AuthorRepositoryPort } from '../../database/repository/author.repository.port';
import { LOGGER } from '@src/constants';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { UserUpdatedIntegrationEvent } from '@src/shared/events/user-updated.integration.event';

@Controller()
export class UpdateAuthorListener {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: AuthorRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @EventPattern(UserUpdatedIntegrationEvent.name)
  async updateAuthor(event: UserUpdatedIntegrationEvent) {
    this.logger.log('UserUpdatedIntegrationEvent received');
    const {
      firstName,
      lastName,
      nickName,
      userId,
      metadata: { timestamp },
    } = event;
    const author = await this.authorRepository.findAuthorByUserId(userId);
    // if no author is found create one
    if (author) {
      author.update({
        firstName,
        lastName,
        nickName,
        version: author.getProps().version,
      });

      try {
        await this.authorRepository.updateAuthorWithConcurrency(
          author,
          new Date(timestamp),
        );
      } catch (error) {
        // handle validation if it is from type unique constraint then we do not throw an error else we throw an error
        this.logger.error(
          `UpdateAuthorListener.updateAuthor: error ${JSON.stringify(error)}`,
        );
        throw error;
      }
    }
  }
}
