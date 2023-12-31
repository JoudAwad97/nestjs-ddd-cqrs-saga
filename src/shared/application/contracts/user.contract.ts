import { UserEntity } from '@src/modules/user-management/user/domain/user.entity';

/**
 * if you are interacting within the same bounded context and need to leverage the full behavior of the domain model,
 * returning entities might be appropriate.
 * However, for interactions that cross boundaries, especially in a modular or microservices architecture,
 * using DTOs is generally the preferred approach
 */
export abstract class UserRepositoryContract {
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findUsersByIds(ids: string[]): Promise<UserEntity[]>;
}
