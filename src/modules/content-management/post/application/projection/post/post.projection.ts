import { Injectable } from '@nestjs/common';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { PostEntity } from '../../../domain/post.entity';
import { PostProjectionPort } from './post.projection.port';
import { PostRepositoryPort } from '../../../infrastructure/dynamodb/repository/post/post.dynamo.repository.port';

@Injectable()
export class PostProjection implements PostProjectionPort {
  constructor(
    private readonly logger: LoggerPort,
    private readonly postProjectionRepository: PostRepositoryPort,
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
