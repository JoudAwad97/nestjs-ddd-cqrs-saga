import { UserEntity } from '../../domain/user.entity';
import { UserListenerResponseDto } from '../../../../shared/dto/user.listener.dto';

export interface UserMapperPort {
  // add more mapping functionalities in here as needed
  toListenerResponse(userEntity: UserEntity): UserListenerResponseDto;
}
