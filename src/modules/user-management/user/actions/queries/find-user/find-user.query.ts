import { QueryBase } from '@src/libs/ddd/query.base';

export class FindUserQuery extends QueryBase {
  readonly userId: string;

  constructor(props: FindUserQuery) {
    super();
    this.userId = props.userId;
  }
}
