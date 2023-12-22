import { AggregateID, AggregateRoot } from '@src/libs/ddd';
import { CreateUserProps, UserProps } from './user.types';
import { v4 as uuidv4 } from 'uuid';

export class UserNotificationEntity extends AggregateRoot<UserProps> {
  protected _id: AggregateID;

  static create(input: CreateUserProps): UserNotificationEntity {
    const id = uuidv4();

    const props: UserProps = {
      ...input,
    };

    const user = new UserNotificationEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
