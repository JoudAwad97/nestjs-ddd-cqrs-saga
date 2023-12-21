import { AggregateID, AggregateRoot } from '@src/libs/ddd';
import {
  CreateUserProps,
  UpdateUserProps,
  UserChangeTypes,
  UserProps,
  UserRoles,
  UserStatuses,
} from './user.types';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './value-objects/user-role.value-objects';
import { UserStatus } from './value-objects/status.value-objects';
import { Email } from './value-objects/email.value-objects';
import { UserCreatedEvent } from './events/user-created.event';
import { UserDeletedEvent } from './events/user-deleted.event';
import { UserUpdatedEvent } from './events/user-updated.event';
import { UserErrors } from './user.errors';

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
    user.addEvent(
      new UserCreatedEvent({
        aggregateId: user.id,
        user,
        metadata: {
          userId: user.id,
        },
      }),
    );

    return user;
  }

  public update(input: UpdateUserProps): void {
    const oldUser = new UserEntity({
      props: {
        ...this.props,
      },
      id: this.id,
    });

    this.props.firstName = input.firstName;
    this.props.lastName = input.lastName;
    this.props.nickName = input.nickName;

    const email = new Email({ email: input.email });
    this.props.email = email;

    this.generateUpdateUserEvent(oldUser, UserChangeTypes.UPDATE);
  }

  private userIsActivated(): boolean {
    return this.props.status.getStatus() === UserStatuses.ACTIVE;
  }

  public allowedToComment(): boolean {
    return this.userIsActivated();
  }

  public allowedToPost(): boolean {
    return (
      this.userIsActivated() && this.props.role.getRole() === UserRoles.ADMIN
    );
  }

  /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getProps() method
  defined in a EntityBase parent class */
  get role(): UserRoles {
    return this.props.role.getRole();
  }

  get email(): Email {
    return this.props.email;
  }

  public changeStatus(status: UserStatuses) {
    const oldUser = new UserEntity({
      props: {
        ...this.props,
      },
      id: this.id,
    });
    this.props.status = new UserStatus({ status });
    this.generateUpdateUserEvent(oldUser, UserChangeTypes.STATUS);
  }

  public activateUser() {
    this.changeStatus(UserStatuses.ACTIVE);
  }

  public deactivateUser() {
    this.changeStatus(UserStatuses.INACTIVE);
  }

  private generateUpdateUserEvent(
    oldUser: UserEntity,
    changeType: UserChangeTypes,
  ) {
    this.addEvent(
      new UserUpdatedEvent({
        aggregateId: this.id,
        metadata: {
          userId: this.id,
        },
        oldUser,
        newUser: new UserEntity({
          props: {
            ...this.props,
          },
          id: this.id,
        }),
        changeType,
      }),
    );
  }

  private changeRole(role: UserRoles) {
    const oldUser = new UserEntity({
      props: {
        ...this.props,
      },
      id: this.id,
    });
    this.props.role = new UserRole({ role });
    this.generateUpdateUserEvent(oldUser, UserChangeTypes.ROLE);
  }

  public makeAdmin() {
    this.changeRole(UserRoles.ADMIN);
  }

  public makeUser() {
    this.changeRole(UserRoles.USER);
  }

  public delete() {
    this.addEvent(
      new UserDeletedEvent({
        aggregateId: this.id,
        metadata: {
          userId: this.id,
        },
        userId: this.id,
      }),
    );
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database

    if (!Object.values(UserStatuses).includes(this.props.status.getStatus())) {
      UserErrors.InvalidStatus();
    }

    if (!Object.values(UserRoles).includes(this.props.role.getRole())) {
      UserErrors.InvalidRole();
    }
  }
}
