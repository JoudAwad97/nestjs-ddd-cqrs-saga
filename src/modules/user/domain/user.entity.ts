import { AggregateID, AggregateRoot } from '@src/libs/ddd';
import {
  CreateUserProps,
  UserProps,
  UserRoles,
  UserStatuses,
} from './user.types';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './value-objects/user-role.value-objects';
import { UserStatus } from './value-objects/status.value-objects';
import { Email } from './value-objects/email.value-objects';

export class UserEntity extends AggregateRoot<UserProps> {
  protected _id: AggregateID;

  static create(input: CreateUserProps): UserEntity {
    const id = uuidv4();

    /* Setting a default role/status since we are not accepting it during creation. */
    const role = new UserRole({ role: UserRoles.USER });
    const status = new UserStatus({ status: UserStatuses.ACTIVE });

    const email = new Email({ email: input.email });

    const props: UserProps = {
      ...input,
      email,
      role,
      status,
    };

    const user = new UserEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */

    return user;
  }

  /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getProps() method
  defined in a EntityBase parent class */
  get role(): UserRoles {
    return this.props.role.getRole();
  }

  public changeStatus(status: UserStatuses) {
    this.props.status = new UserStatus({ status });
    // TODO: add event
  }

  private changeRole(role: UserRoles) {
    this.props.role = new UserRole({ role });
  }

  public makeAdmin() {
    this.changeRole(UserRoles.ADMIN);
  }

  public makeUser() {
    this.changeRole(UserRoles.USER);
  }

  public delete() {
    // TODO: ADD EVENT
  }

  public validate(): void {
    throw new Error('Method not implemented.');
  }
}
