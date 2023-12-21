import { RepositoryPort } from 'src/libs/ports/repository.port';
import { AuthorEntity } from '../../domain/author.entity';

export interface AuthorRepositoryPort extends RepositoryPort<AuthorEntity> {
  findAuthorByUserId(userId: string): Promise<AuthorEntity | null>;
  updateAuthorWithConcurrency(author: AuthorEntity, date: Date): Promise<void>;
}
