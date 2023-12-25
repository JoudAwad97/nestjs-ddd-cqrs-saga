import { Mapper } from '@src/libs/ddd';
import { AuthorEntity } from '../../../domain/author.entity';
import { AuthorDatabaseModel } from '../schema/author.database.schema';
import { AuthorResponseDto } from '../../../persistence/dtos/author.db.dto';
import { AuthorMapperContract } from '@src/modules/content-management/post/application/contracts/author.repository.contract';
import { Mixin } from 'ts-mixer';

/**
 * For multiple inheritance we can not use "Abstract class" we are only able to use "Interface"
 * or we can use Mixin but even with mixin the interface will hold all the logic and the mixin
 */

export abstract class AuthorMapperPort extends Mixin(
  Mapper<AuthorEntity, AuthorDatabaseModel, AuthorResponseDto>,
  AuthorMapperContract,
) {
  abstract toResponseFromPersistence(
    record: AuthorDatabaseModel,
  ): AuthorResponseDto;
}
