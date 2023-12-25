import { Injectable } from '@nestjs/common';
import { PostRepositoryPort } from './post.dynamo.repository.port';
import { PostEntity } from '../../../../domain/post.entity';
import { DynamoDBService } from '@src/shared/infrastructure/database-providers/dynamodb/dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { POST_TABLE_NAME } from '@src/modules/content-management/post/constants/dynamo.constants';
import { PostMapperPort } from '../../mapper/post.mapper.port';

@Injectable()
export class PostProjectionRepository implements PostRepositoryPort {
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    private readonly postMapper: PostMapperPort,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    const params: ScanCommandInput = {
      TableName: POST_TABLE_NAME,
    };
    const { Items } = await this.dynamoDBService.ddbDocClient.send(
      new ScanCommand(params),
    );
    return Items.map(this.postMapper.toDomain);
  }

  async create(post: PostEntity): Promise<PostEntity> {
    const dynamoDBItem = this.postMapper.toPersistence(post);

    const params: PutCommandInput = {
      TableName: POST_TABLE_NAME,
      Item: dynamoDBItem,
    };
    await this.dynamoDBService.ddbDocClient.send(new PutCommand(params));
    return post;
  }

  async delete(postId: string, userId: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: POST_TABLE_NAME,
      Key: {
        pk: postId,
        author_id: userId,
      },
    };
    await this.dynamoDBService.ddbDocClient.send(new DeleteCommand(params));
  }
}
