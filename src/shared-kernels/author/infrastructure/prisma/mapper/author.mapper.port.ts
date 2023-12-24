import { Mapper } from '@src/libs/ddd';
import { AuthorEntity } from '../../../domain/author.entity';
import { AuthorDatabaseModel } from '../schema/author.database.schema';
import { AuthorResponseDto } from '../../../persistence/dtos/author.db.dto';
import { AuthorMapperContract } from '@src/modules/content-management/post/application/contracts/author.repository.contract';

/**
 * For multiple inheritance we can not use "Abstract class" we are only able to use "Interface"
 * or we can use Mixin but even with mixin the interface will hold all the logic and the mixin
 */

export interface AuthorMapperPort
  extends Mapper<AuthorEntity, AuthorDatabaseModel, AuthorResponseDto>,
    AuthorMapperContract {
  toResponseFromPersistence(record: AuthorDatabaseModel): AuthorResponseDto;
}
