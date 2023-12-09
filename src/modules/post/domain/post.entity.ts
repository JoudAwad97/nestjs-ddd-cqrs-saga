import {
  CreatePostProps,
  PostProps,
  PostStatuses,
  UpdatePostProps,
} from './post.types';
import { AggregateID, AggregateRoot } from '@src/libs/ddd';
import { v4 as uuidv4 } from 'uuid';
import { PostStatus } from './value-objects/status.value-objects';
import { PostErrors } from './post.errors';
import { PostUpdatedEvent } from './events/post-updated.event';

export class PostEntity extends AggregateRoot<PostProps> {
  protected _id: AggregateID;

  static create(input: CreatePostProps): PostEntity {
    const id = uuidv4();

    const status = new PostStatus({ status: PostStatuses.PUBLISHED });

    const props: PostProps = {
      ...input,
      status,
    };

    const post = new PostEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return post;
  }

  public canCommentOnPost(): boolean {
    return this.props.status.getStatus() === PostStatuses.PUBLISHED;
  }

  private generateUpdatePostEvent(oldPost: PostEntity) {
    this.addEvent(
      new PostUpdatedEvent({
        aggregateId: this.id,
        metadata: {
          userId: this.props.authorId,
        },
        oldPost,
        newPost: { ...this },
      }),
    );
  }

  public update(input: UpdatePostProps): void {
    const oldPost = { ...this };

    this.props.title = input.title;
    this.props.content = input.content;

    this.generateUpdatePostEvent(oldPost);
  }

  private changePostStatus(postStatus: PostStatuses) {
    const oldPost = { ...this };
    this.props.status = new PostStatus({ status: postStatus });
    this.generateUpdatePostEvent(oldPost);
  }

  public publicPost(): void {
    this.changePostStatus(PostStatuses.PUBLISHED);
  }

  public draftPost(): void {
    this.changePostStatus(PostStatuses.DRAFT);
  }

  public archivePost(): void {
    this.changePostStatus(PostStatuses.ARCHIVED);
  }

  public validate(): void {
    if (!this.props.title || this.props.title.trim().length === 0) {
      PostErrors.InvalidTitle();
    }

    if (!Object.values(PostStatuses).includes(this.props.status.getStatus())) {
      PostErrors.InvalidStatus();
    }
  }
}
