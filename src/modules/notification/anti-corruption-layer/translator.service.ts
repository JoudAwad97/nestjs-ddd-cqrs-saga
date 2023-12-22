import { UserNotificationEntity } from '../domain/user.entity';
import { TranslatorServicePort } from './translator.service.port';
import { Injectable } from '@nestjs/common';
import { UserNotificationAdaptor } from './user/adaptar';

@Injectable()
export class TranslatorService implements TranslatorServicePort {
  constructor(
    private readonly userNotificationAdaptor: UserNotificationAdaptor,
  ) {}

  async translatorToNotificationUser(
    userId: string,
  ): Promise<UserNotificationEntity> {
    return this.userNotificationAdaptor.fetchUserInformationForNotificationHandler(
      userId,
    );
  }
}
