import { UserEntity } from '../../../domain/user.entity';
import { UserListenerResponseDto } from '../../../../../../shared/application/dto/user.listener.dto';
import { UserResponseDto } from '../../../presenters/dtos/user.db.dto';
import { UserDatabaseModel } from '../schema/user.database.schema';
import { Mapper } from '@src/libs/ddd';
import { INotificationUserResponseDTO } from '@src/modules/notification/application/contracts/user.repository.contract';

export interface UserMapperPort
  extends Mapper<UserEntity, UserDatabaseModel, UserResponseDto> {
  // add more mapping functionalities in here as needed
  toListenerResponse(userEntity: UserEntity): UserListenerResponseDto;
  toNotificationAdaptorResponse(
    record: UserDatabaseModel,
  ): INotificationUserResponseDTO;
}
