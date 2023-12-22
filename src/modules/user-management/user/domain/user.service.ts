import { UserEntity } from './user.entity';

export class UserService {
  /**
   * Implement any extremely complex business logic here that is related to domain only
   * EXAMPLE: instead of calling multiple functions from the Entity, use this service to Facade the complexity
   */
  allowUserToAuthenticate(user: UserEntity) {
    // consider adding a more realistic implementation
    return user.allowedToComment();
  }
}
