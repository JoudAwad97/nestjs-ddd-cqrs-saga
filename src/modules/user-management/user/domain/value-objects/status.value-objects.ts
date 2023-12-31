import { ValueObject } from '@libs/ddd';
import { ArgumentInvalidException } from '@src/libs/exception';
import { z } from 'zod';
import { UserStatuses } from '../user.types';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface UserStatusProps {
  status: UserStatuses;
}

// Define a Zod schema for email
const statusSchema = z.object({
  status: z.enum([UserStatuses.ACTIVE, UserStatuses.INACTIVE]),
});

export class UserStatus extends ValueObject<UserStatusProps> {
  getStatus(): UserStatuses {
    return this.props.status;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: UserStatusProps): void {
    // check for email format, validation, etc..
    // Validate the email using Zod
    try {
      statusSchema.parse(props); // This will throw an error if validation fails
    } catch (error) {
      // Handle or rethrow the validation error
      throw new ArgumentInvalidException('Status is invalid');
    }
  }
}
