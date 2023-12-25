import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';

export abstract class AuthorProjectionPort {
  abstract projectAuthorToReadDB(author: AuthorEntity): Promise<void>;
  abstract projectAuthorDeleteFromReadDB(authorId: string): Promise<void>;
}
