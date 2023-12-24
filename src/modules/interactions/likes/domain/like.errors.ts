import { BadRequestException } from '@nestjs/common';

export class LikeErrors {
  static InvalidLike(): void {
    throw new BadRequestException('Like can not be created...');
  }
}
