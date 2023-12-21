import { AggregateID, AggregateRoot } from '@src/libs/ddd';

import { v4 as uuidv4 } from 'uuid';
import {
  AuthorProps,
  CreateAuthorProps,
  UpdateAuthorProps,
} from './author.types';

export class AuthorEntity extends AggregateRoot<AuthorProps> {
  protected _id: AggregateID;

  static create(input: CreateAuthorProps): AuthorEntity {
    const id = uuidv4();

    const props: AuthorProps = {
      ...input,
      userId: input.userId,
      version: 0,
    };

    const author = new AuthorEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return author;
  }

  public update(input: UpdateAuthorProps): void {
    this.props.firstName = input.firstName;
    this.props.lastName = input.lastName;
    this.props.nickName = input.nickName;
  }

  // if the logic of allowing user to comment even if he is not activated
  // a business breaker then consider added the active/status to the "Author" model
  //   public allowedToComment(): boolean {
  //     return this.AuthorIsActivated();
  //   }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
