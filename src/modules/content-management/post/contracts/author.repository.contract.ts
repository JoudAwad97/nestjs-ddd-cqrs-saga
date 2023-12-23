import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';
import { AuthorDynamoDBModel } from '../database/schema/author.dynamo.schema';

export abstract class AuthorMapperContract {
  abstract toDomainFromDynamoDB(record: AuthorDynamoDBModel): AuthorEntity;
  abstract toPersistenceDynamoDB(entity: AuthorEntity): AuthorDynamoDBModel;
}
