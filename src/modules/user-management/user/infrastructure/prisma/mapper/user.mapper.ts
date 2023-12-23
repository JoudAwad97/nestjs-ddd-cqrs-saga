import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/user.entity';
import {
  UserDatabaseModel,
  userDatabaseSchema,
} from '../schema/user.database.schema';
import { UserResponseDto } from '../../../presenters/dtos/user.db.dto';
import { Email } from '../../../domain/value-objects/email.value-objects';
import { UserRole } from '../../../domain/value-objects/user-role.value-objects';
import { UserStatus } from '../../../domain/value-objects/status.value-objects';
import { UserRoles, UserStatuses } from '../../../domain/user.types';
import { UserMapperPort } from './user.mapper.port';
import { UserListenerResponseDto } from '../../../../../../shared/application/dto/user.listener.dto';
import { INotificationUserResponseDTO } from '@src/modules/notification/application/contracts/user.repository.contract';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
@Injectable()
export class UserMapper implements UserMapperPort {
  toNotificationAdaptorResponse(
    record: UserDatabaseModel,
  ): INotificationUserResponseDTO {
    return {
      email: record.email,
      firstName: record.first_name,
      lastName: record.last_name,
      id: record.id,
    };
  }
  /**
   * Convert Domain Entity into Database Record
   */
  toPersistence(entity: UserEntity): UserDatabaseModel {
    const copy = entity.getProps();
    const record: UserDatabaseModel = {
      created_at: copy.createdAt,
      email: copy.email.getEmail(),
      first_name: copy.firstName,
      id: copy.id,
      last_name: copy.lastName,
      nick_name: copy.nickName,
      password: copy.password,
      role: copy.role.getRole(),
      status: copy.status.getStatus(),
      updated_at: copy.updatedAt,
    };
    return userDatabaseSchema.parse(record);
  }

  /**
   * Convert Database Record into Domain Entity
   */
  toDomain(record: UserDatabaseModel): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        email: new Email({ email: record.email }),
        firstName: record.first_name,
        lastName: record.last_name,
        nickName: record.nick_name,
        password: record.password,
        /**
         * Either create a mapper per instance
         * or enforce the typing
         */
        role: new UserRole({ role: record.role as UserRoles }),
        status: new UserStatus({ status: record.status as UserStatuses }),
      },
    });
    return entity;
  }

  /**
   * Convert Domain Entity into Response DTO
   * this can be helpful to determine what information you are returning to the client.
   */
  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();
    const response = new UserResponseDto(entity);
    response.email = props.email.getEmail();
    response.firstName = props.firstName;
    response.lastName = props.lastName;
    response.nickName = props.nickName;
    return response;
  }

  toListenerResponse(entity: UserEntity): UserListenerResponseDto {
    const props = entity.getProps();
    const response = new UserListenerResponseDto(entity);
    response.firstName = props.firstName;
    response.lastName = props.lastName;
    response.nickName = props.nickName;
    response.role = props.role.getRole();
    response.status = props.status.getStatus();
    return response;
  }
}
