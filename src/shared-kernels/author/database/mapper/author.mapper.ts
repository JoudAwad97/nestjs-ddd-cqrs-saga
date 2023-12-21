import { Injectable } from '@nestjs/common';
import { AuthorMapperPort } from './author.mapper.port';
import { AuthorEntity } from '../../domain/author.entity';
import { AuthorResponseDto } from '../../dtos/author.db.dto';
import { UserDatabaseModel } from '@src/modules/user-management/user/database/schema/user.database.schema';
import {
  AuthorDatabaseModel,
  authorDatabaseSchema,
} from '../schema/author.database.schema';

@Injectable()
export class AuthorMapper implements AuthorMapperPort {
  toResponseFromPersistence(record: AuthorDatabaseModel): AuthorResponseDto {
    return {
      id: record.id,
      createdAt: record.created_at.toISOString(),
      updatedAt: record.updated_at.toISOString(),
      firstName: record.first_name,
      lastName: record.last_name,
      nickName: record.nick_name,
    };
  }
  toPersistence(entity: AuthorEntity): UserDatabaseModel {
    const copy = entity.getProps();
    const record: AuthorDatabaseModel = {
      created_at: copy.createdAt,
      first_name: copy.firstName,
      id: copy.id,
      user_id: copy.userId,
      last_name: copy.lastName,
      nick_name: copy.nickName,
      updated_at: copy.updatedAt,
      version: copy.version,
    };
    return authorDatabaseSchema.parse(record);
  }

  toDomain(record: AuthorDatabaseModel): AuthorEntity {
    const entity = new AuthorEntity({
      id: record.id,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        firstName: record.first_name,
        lastName: record.last_name,
        nickName: record.nick_name,
        userId: record.user_id,
        version: record.version,
      },
    });
    return entity;
  }

  toResponse(entity: AuthorEntity): AuthorResponseDto {
    const props = entity.getProps();
    const response = new AuthorResponseDto(entity);
    response.lastName = props.lastName;
    response.firstName = props.firstName;
    response.nickName = props.nickName;
    return response;
  }
}
