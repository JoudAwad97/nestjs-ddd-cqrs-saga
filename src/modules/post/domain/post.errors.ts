import { BadRequestException, MethodNotAllowedException } from '@nestjs/common';

export class PostErrors {
  static InvalidStatus(): void {
    throw new BadRequestException('Invalid Status...');
  }

  static InvalidTitle(): void {
    throw new BadRequestException('invalid title value provided...');
  }

  static UserNotAllowedToPublishAPost(): void {
    throw new MethodNotAllowedException(
      'User is not allowed to publish a post...',
    );
  }
}
