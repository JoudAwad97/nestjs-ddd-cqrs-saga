import { PaginatedParams, PaginatedQueryBase } from '@src/libs/ddd/query.base';

export class FindPostCommentsQuery extends PaginatedQueryBase {
  readonly postId: string;

  constructor(props: PaginatedParams<FindPostCommentsQuery>) {
    super(props);
    this.postId = props.postId;
  }
}
