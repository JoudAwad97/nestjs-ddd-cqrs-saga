import { Mapper } from '@src/libs/ddd';
import { AuthorEntity } from '../../domain/author.entity';
import { AuthorDatabaseModel } from '../schema/author.database.schema';
import { AuthorResponseDto } from '../../dtos/author.db.dto';

export interface AuthorMapperPort
  extends Mapper<AuthorEntity, AuthorDatabaseModel, AuthorResponseDto> {}
