import { DomainEvent, DomainEventProps } from '@src/libs/ddd';
import { PostEntity } from '../post.entity';

export class PostUpdatedEvent extends DomainEvent {
  public newPost: PostEntity;
  public oldPost: PostEntity;

  constructor(props: DomainEventProps<PostUpdatedEvent>) {
    super(props);
    this.newPost = props.oldPost;
  }
}
