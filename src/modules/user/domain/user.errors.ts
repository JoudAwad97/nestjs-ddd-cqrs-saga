import { ExceptionBase } from '@src/libs/exception/exception.base';

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message = 'User already exists';

  public readonly code = 'USER.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}

export class EmailAlreadyInUse extends ExceptionBase {
  static readonly message = 'Email already in use';

  public readonly code = 'USER.EMAIL_ALREADY_IN_USE';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}
