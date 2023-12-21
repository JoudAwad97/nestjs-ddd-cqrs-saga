import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class PostDeletedEvent extends DomainEvent {
  public postId: string;
  public authorId: string;

  constructor(props: DomainEventProps<PostDeletedEvent>) {
    super(props);
    this.postId = props.postId;
    this.authorId = props.authorId;
  }
}
