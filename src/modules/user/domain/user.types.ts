import { Email } from './value-objects/email.value-objects';
import { UserStatus } from './value-objects/status.value-objects';
import { UserRole } from './value-objects/user-role.value-objects';

// All properties that a User has
export interface UserProps {
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  email: Email;
  status: UserStatus;
  role: UserRole;
}

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatuses {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserChangeTypes {
  EMAIL = 'EMAIL',
  STATUS = 'STATUS',
  ROLE = 'ROLE',
}
