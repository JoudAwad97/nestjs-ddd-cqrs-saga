import { AggregateRoot } from '@src/libs/ddd';
import { CommentProps } from './comment.types';
import { v4 as uuidv4 } from 'uuid';
import { CommentErrors } from './comment.errors';

export class CommentEntity extends AggregateRoot<CommentProps> {
  protected _id: string;

  static create(props: CommentProps): CommentEntity {
    const id = uuidv4();

    const comment = new CommentEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // add event of creation
    // i am not gonna add events here for time saving
    // but you can add event here that publish an integration event
    // the integration event will trigger post update to update
    // the number of comments on the post

    return comment;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  public commentIsValid() {
    return this.props.content && this.props.content.length > 0;
  }

  public validate(): void {
    if (!this.commentIsValid()) {
      CommentErrors.InvalidComment();
    }
  }
}
