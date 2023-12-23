import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AUTHOR_REPOSITORY } from '../../author.di-tokens';
import { AuthorRepositoryPort } from '../../database/prisma/repository/author.repository.port';
import { LOGGER } from '@src/shared/constants';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { UserUpdatedIntegrationEvent } from '@src/shared/infrastructure/integration-events/user-updated.integration.event';

@Controller()
export class UpdateAuthorListener {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: AuthorRepositoryPort,
    @Inject(LOGGER) private readonly logger: LoggerPort,
  ) {}

  @EventPattern(UserUpdatedIntegrationEvent.name)
  async updateAuthor(
    @Payload() event: UserUpdatedIntegrationEvent,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

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
        channel.ack(originalMsg);
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
