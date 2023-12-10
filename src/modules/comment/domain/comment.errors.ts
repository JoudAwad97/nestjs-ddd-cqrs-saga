import { BadRequestException } from '@nestjs/common';

export class CommentErrors {
  static InvalidComment(): void {
    throw new BadRequestException('Invalid comment content...');
  }

  static AuthorCannotComment(): void {
    throw new BadRequestException('Author cannot comment...');
  }

  static PostCannotBeCommented(): void {
    throw new BadRequestException('Post cannot be commented...');
  }
}
