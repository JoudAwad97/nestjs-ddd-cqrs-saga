import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserCreatedIntegrationEvent } from '@src/shared/events/user-created.integration.event';
import { AUTHOR_REPOSITORY } from '../../author.di-tokens';
import { AuthorRepositoryPort } from '../../database/repository/author.repository.port';
import { AuthorEntity } from '../../domain/author.entity';
import { LOGGER } from '@src/constants';
import { ILoggerPort } from '@src/libs/ports/logger.port';

@Controller()
export class CreateAuthorListener {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: AuthorRepositoryPort,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @EventPattern(UserCreatedIntegrationEvent.name)
  async createAuthor(
    @Payload() event: UserCreatedIntegrationEvent,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('UserCreatedIntegrationEvent received');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const { firstName, lastName, nickName, userId } = event;
    const author = await this.authorRepository.findAuthorByUserId(event.userId);
    // if no author is found create one
    if (!author) {
      const authorEntity = AuthorEntity.create({
        firstName,
        lastName,
        nickName,
        userId,
      });

      try {
        await this.authorRepository.create(authorEntity);
        channel.ack(originalMsg);
      } catch (error) {
        // handle validation if it is from type unique constraint then we do not throw an error else we throw an error
        if (error?.name === 'UniqueConstraintError') {
          // Handle unique constraint error differently
          this.logger.warn('Unique constraint error occurred');
          channel.ack(originalMsg);
        } else {
          // Rethrow the error if it's not a unique constraint error
          throw error;
        }
      }
    }
  }
}
