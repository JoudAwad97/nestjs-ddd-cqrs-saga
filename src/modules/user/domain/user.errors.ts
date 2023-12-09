import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class UserErrors {
  static UserAlreadyExists(): void {
    throw new ConflictException('User already exists');
  }

  static EmailAlreadyInUse(): void {
    throw new ConflictException('Email already in use');
  }

  static UserNotFound(): void {
    throw new NotFoundException('User not found');
  }

  static InvalidStatus(): void {
    throw new BadRequestException('Invalid status');
  }

  static InvalidRole(): void {
    throw new BadRequestException('Invalid role');
  }
}
