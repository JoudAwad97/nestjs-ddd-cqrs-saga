import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';
import { AuthorDynamoDBModel } from '../../infrastructure/dynamodb/schema/author.schema';

export abstract class AuthorMapperContract {
  abstract toDomainFromDynamoDB(record: AuthorDynamoDBModel): AuthorEntity;
  abstract toPersistenceDynamoDB(entity: AuthorEntity): AuthorDynamoDBModel;
}
