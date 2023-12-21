import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBService } from '@src/infrastructure/database-providers/dynamodb/dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { AUTHOR_TABLE_NAME } from '@src/modules/content-management/post/constants/dynamo.constants';
import { AuthorProjectionRepositoryPort } from './author.dynamo.repository.port';
import { AuthorEntity } from '@src/shared-kernels/author/domain/author.entity';
import { AuthorMapperContract } from '@src/modules/content-management/post/contracts/author.repository.contract';
import { AUTHOR_MAPPER } from '@src/shared-kernels/author/author.di-tokens';

@Injectable()
export class AuthorProjectionRepository
  implements AuthorProjectionRepositoryPort
{
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    @Inject(AUTHOR_MAPPER) private readonly authorMapper: AuthorMapperContract,
  ) {}

  async findById(authorId: string): Promise<AuthorEntity> {
    const params: GetCommandInput = {
      TableName: AUTHOR_TABLE_NAME,
      Key: {
        author_id: authorId,
      },
    };

    const res = await this.dynamoDBService.ddbDocClient.send(
      new GetCommand(params),
    );
    return this.authorMapper.toDomainFromDynamoDB(res.Item);
  }

  async create(author: AuthorEntity): Promise<AuthorEntity> {
    const dynamoDBItem = this.authorMapper.toPersistenceDynamoDB(author);

    const params: PutCommandInput = {
      TableName: AUTHOR_TABLE_NAME,
      Item: dynamoDBItem,
    };
    await this.dynamoDBService.ddbDocClient.send(new PutCommand(params));
    return author;
  }

  async delete(authorId: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: AUTHOR_TABLE_NAME,
      Key: {
        author_id: authorId,
      },
    };
    await this.dynamoDBService.ddbDocClient.send(new DeleteCommand(params));
  }
}
