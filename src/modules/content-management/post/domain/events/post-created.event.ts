import { DomainEvent, DomainEventProps } from '@src/libs/ddd';
import { PostEntity } from '../post.entity';

export class PostCreatedEvent extends DomainEvent {
  public post: PostEntity;

  constructor(props: DomainEventProps<PostCreatedEvent>) {
    super(props);
    this.post = props.post;
  }
}
