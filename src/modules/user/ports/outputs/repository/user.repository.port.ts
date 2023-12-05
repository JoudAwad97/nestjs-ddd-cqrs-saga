import { UserEntity } from '@src/modules/user/domain/user.entity';
import { RepositoryPort } from 'src/libs/ports/repository.port';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  // add more methods here
  findOneByEmail(email: string): Promise<UserEntity | null>;
}
