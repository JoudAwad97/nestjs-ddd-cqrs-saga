import { PaginatedParams, PaginatedQueryBase } from '@src/libs/ddd/query.base';

export class GetPostLikesQuery extends PaginatedQueryBase {
  readonly postId: string;

  constructor(props: PaginatedParams<GetPostLikesQuery>) {
    super(props);
    this.postId = props.postId;
  }
}
