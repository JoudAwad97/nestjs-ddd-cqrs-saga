import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

export abstract class AuthorRepositoryPort {
  abstract create(author: AuthorEntity): Promise<AuthorEntity>;
  abstract delete(authorId: string): Promise<void>;
  abstract findById(authorId: string): Promise<AuthorEntity>;
  abstract findAuthorsByIds(authorIds: string[]): Promise<AuthorEntity[]>;
}
