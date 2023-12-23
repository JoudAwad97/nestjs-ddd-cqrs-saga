import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDBService {
  private readonly ddbClient;

  public constructor() {
    this.ddbClient = new DynamoDBClient({
      endpoint: 'http://localhost:8000',
    });

    /**
     * This is not a production ready code.
     * it is just a dummy code to create a table in local dynamodb
    //  */
    try {
      // this.ddbClient.send(
      //   new DeleteTableCommand({ TableName: AUTHOR_TABLE_NAME }),
      // );
      // this.ddbClient.send(new CreateTableCommand(authorTable));
    } catch (_) {}
  }

  public get ddbDocClient(): DynamoDBClient {
    return this.ddbClient;
  }
}
