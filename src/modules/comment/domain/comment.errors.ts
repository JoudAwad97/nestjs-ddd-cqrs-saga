import { BadRequestException } from '@nestjs/common';

export class CommentErrors {
  static InvalidComment(): void {
    throw new BadRequestException('Invalid comment content...');
  }
}
