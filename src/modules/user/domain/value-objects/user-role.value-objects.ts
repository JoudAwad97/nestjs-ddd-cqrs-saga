import { ValueObject } from '@libs/ddd';
import { ArgumentInvalidException } from '@src/libs/exception';
import { z } from 'zod';
import { UserRoles } from '../user.types';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface UserRoleProps {
  role: UserRoles;
}

// Define a Zod schema for email
const roleSchema = z.object({
  role: z.enum([UserRoles.ADMIN, UserRoles.USER]),
});

export class UserRole extends ValueObject<UserRoleProps> {
  getRole(): UserRoles {
    return this.props.role;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: UserRoleProps): void {
    // check for email format, validation, etc..
    // Validate the email using Zod
    try {
      roleSchema.parse(props); // This will throw an error if validation fails
    } catch (error) {
      // Handle or rethrow the validation error
      throw new ArgumentInvalidException('Role is invalid');
    }
  }
}
