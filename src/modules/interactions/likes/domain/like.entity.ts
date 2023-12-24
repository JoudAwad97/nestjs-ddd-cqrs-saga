import { AggregateRoot } from '@src/libs/ddd';
import { LikeProps } from './like.types';
import { v4 as uuidv4 } from 'uuid';

export class LikeEntity extends AggregateRoot<LikeProps> {
  protected _id: string;

  static create(props: LikeProps): LikeEntity {
    const id = uuidv4();

    const like = new LikeEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // fire the like created event

    return like;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get postId(): string {
    return this.props.postId;
  }

  public validate(): void {
    // add logic to validate the like
  }
}
