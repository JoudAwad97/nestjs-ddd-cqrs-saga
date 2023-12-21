import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

export interface AuthorProjectionRepositoryPort {
  create(author: AuthorEntity): Promise<AuthorEntity>;
  delete(authorId: string): Promise<void>;
  findById(authorId: string): Promise<AuthorEntity>;
  findAuthorsByIds(authorIds: string[]): Promise<AuthorEntity[]>;
}
