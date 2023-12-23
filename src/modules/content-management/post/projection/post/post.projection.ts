import { Inject, Injectable } from '@nestjs/common';
import { POST_PROJECTION_REPOSITORY } from '../../post.di-tokens';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PostEntity } from '../../domain/post.entity';
import { PostProjectionPort } from '../post/post.projection.port';
import { PostProjectionRepositoryPort } from '../../database/repository/read/post/post.dynamo.repository.port';
import { LOGGER } from '@src/shared/constants';

@Injectable()
export class PostProjection implements PostProjectionPort {
  constructor(
    @Inject(LOGGER) private readonly logger: LoggerPort,
    @Inject(POST_PROJECTION_REPOSITORY)
    private readonly postProjectionRepository: PostProjectionRepositoryPort,
  ) {}

  async projectPostToReadDB(post: PostEntity): Promise<void> {
    this.logger.log('projectPostToReadDB: writing from write DB to Read DB');
    try {
      await this.postProjectionRepository.create(post);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async projectPostDeleteFromReadDB(
    postId: string,
    authorId: string,
  ): Promise<void> {
    this.logger.log(
      'projectPostDeleteFromReadDB: deleting record from the Read DB',
    );

    try {
      await this.postProjectionRepository.delete(postId, authorId);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
