import { Inject, Injectable } from '@nestjs/common';
import { AUTHOR_PROJECTION_REPOSITORY } from '../../post.di-tokens';
import { ILoggerPort } from '@src/libs/ports/logger.port';
import { LOGGER } from '@src/constants';
import { AuthorProjectionPort } from './author.projection.port';
import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';
import { AuthorProjectionRepositoryPort } from '../../database/repository/read/author/author.dynamo.repository.port';

@Injectable()
export class AuthorProjection implements AuthorProjectionPort {
  constructor(
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(AUTHOR_PROJECTION_REPOSITORY)
    private readonly authorProjectionRepository: AuthorProjectionRepositoryPort,
  ) {}

  async projectAuthorToReadDB(author: AuthorEntity): Promise<void> {
    this.logger.log(`Projecting author ${author.id} to read DB`);
    await this.authorProjectionRepository.create(author);
  }

  projectAuthorDeleteFromReadDB(authorId: string): Promise<void> {
    this.logger.log(`Deleting author ${authorId} to read DB`);
    return this.authorProjectionRepository.delete(authorId);
  }
}
