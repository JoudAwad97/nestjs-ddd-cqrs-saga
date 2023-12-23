import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import {
  AUTHOR_TABLE_NAME,
  POST_GSI_BY_USER,
  POST_TABLE_NAME,
} from '@src/modules/content-management/post/constants/dynamo.constants';

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

export const authorTable: CreateTableCommandInput = {
  TableName: AUTHOR_TABLE_NAME,
  KeySchema: [
    {
      AttributeName: 'author_id',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'author_id',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
