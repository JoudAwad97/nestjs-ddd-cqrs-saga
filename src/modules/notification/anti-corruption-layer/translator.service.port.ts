import { UserNotificationEntity } from '../domain/user.entity';

export interface TranslatorServicePort {
  translatorToNotificationUser(userId: string): Promise<UserNotificationEntity>;
}
