import { UserNotificationEntity } from '../../domain/user.entity';

export abstract class TranslatorServicePort {
  abstract translatorToNotificationUser(
    userId: string,
  ): Promise<UserNotificationEntity>;
}
