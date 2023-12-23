import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../notification.di-tokens';
import { NotificationUserRepositoryContract } from '../../../application/contracts/user.repository.contract';
import { UserNotificationEntity } from '../../../domain/user.entity';
import { UserNotificationTranslator } from './translator';

@Injectable()
export class UserNotificationAdaptor {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: NotificationUserRepositoryContract,
  ) {}

  public async fetchUserInformationForNotificationHandler(
    userId: string,
  ): Promise<UserNotificationEntity> {
    /**
     * In microservices world this usually going to be an HTTP request to another service (grpc, rest, etc...)
     * but for simplicity in here i made a contract with a call to another repository.
     * this can also be hosted in the "infrastructure" layer, and we can have a reference to it in the "domain" layer.
     */
    return this.userRepository
      .fetchUserInformationForNotificationHandler(userId)
      .then(new UserNotificationTranslator().toNotificationUserEntity);
  }
}
