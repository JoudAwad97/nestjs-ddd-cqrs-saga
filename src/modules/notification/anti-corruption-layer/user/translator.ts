import { INotificationUserResponseDTO } from '../../contracts/user.repository.contract';
import { UserNotificationEntity } from '../../domain/user.entity';

export class UserNotificationTranslator {
  toNotificationUserEntity(
    userDto: INotificationUserResponseDTO,
  ): UserNotificationEntity {
    return UserNotificationEntity.create(userDto);
  }
}
