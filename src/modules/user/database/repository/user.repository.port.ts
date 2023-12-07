import { RepositoryPort } from 'src/libs/ports/repository.port';
import { UserEntity } from '../../domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  // add more methods here
  findOneByEmail(email: string): Promise<UserEntity | null>;
  updateUser(user: UserEntity): Promise<UserEntity>;
}
