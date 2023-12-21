import { Mapper } from '@src/libs/ddd';
import { AuthorEntity } from '../../domain/author.entity';
import { AuthorDatabaseModel } from '../schema/author.database.schema';
import { AuthorResponseDto } from '../../dtos/author.db.dto';
import { AuthorMapperContract } from '@src/modules/content-management/post/contracts/author.repository.contract';

export interface AuthorMapperPort
  extends Mapper<AuthorEntity, AuthorDatabaseModel, AuthorResponseDto>,
    AuthorMapperContract {
  toResponseFromPersistence(record: AuthorDatabaseModel): AuthorResponseDto;
}
