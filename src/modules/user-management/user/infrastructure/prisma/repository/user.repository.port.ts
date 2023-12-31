import { Paginated, RepositoryPort } from 'src/libs/ports/repository.port';
import { UserEntity } from '../../../domain/user.entity';
import { PaginatedQueryBase } from '@src/libs/ddd/query.base';
import { NotificationUserRepositoryContract } from '@src/modules/notification/application/contracts/user.repository.contract';
import { Mixin } from 'ts-mixer';

export abstract class UserRepositoryPort extends Mixin(
  RepositoryPort<UserEntity>,
  NotificationUserRepositoryContract,
) {
  // add more methods here
  abstract findOneByEmail(email: string): Promise<UserEntity | null>;
  abstract updateUser(user: UserEntity): Promise<UserEntity>;
  abstract fetchPaginatedUsers(
    input: PaginatedQueryBase,
  ): Promise<Paginated<UserEntity>>;
}
