import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';
import { AuthorDynamoDBModel } from '../database/schema/author.dynamo.schema';

export interface AuthorMapperContract {
  toDomainFromDynamoDB(record: AuthorDynamoDBModel): AuthorEntity;
  toPersistenceDynamoDB(entity: AuthorEntity): AuthorDynamoDBModel;
}
