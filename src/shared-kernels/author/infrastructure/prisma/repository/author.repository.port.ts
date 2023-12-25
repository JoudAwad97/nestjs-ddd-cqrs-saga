import { RepositoryPort } from 'src/libs/ports/repository.port';
import { AuthorEntity } from '../../../domain/author.entity';

export abstract class AuthorRepositoryPort extends RepositoryPort<AuthorEntity> {
  abstract findAuthorByUserId(userId: string): Promise<AuthorEntity | null>;
  abstract updateAuthorWithConcurrency(
    author: AuthorEntity,
    date: Date,
  ): Promise<void>;
}
