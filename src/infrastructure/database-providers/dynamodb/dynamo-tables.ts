import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import {
  POST_GSI_BY_USER,
  POST_TABLE_NAME,
} from '@src/modules/post/constants/dynamo.constants';

export const postTable: CreateTableCommandInput = {
  TableName: POST_TABLE_NAME,
  KeySchema: [
    {
      AttributeName: 'pk',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'author_id',
      KeyType: 'RANGE',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: POST_GSI_BY_USER,
      KeySchema: [
        { AttributeName: 'author_id', KeyType: 'HASH' },
        { AttributeName: 'created_at', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'pk',
      AttributeType: 'S',
    },
    {
      AttributeName: 'author_id',
      AttributeType: 'S',
    },
    {
      AttributeName: 'created_at',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
