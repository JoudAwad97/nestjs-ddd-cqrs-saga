import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

export interface AuthorProjectionPort {
  projectAuthorToReadDB(author: AuthorEntity): Promise<void>;
  projectAuthorDeleteFromReadDB(authorId: string): Promise<void>;
}
