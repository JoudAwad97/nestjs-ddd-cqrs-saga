import { ValueObject } from '@libs/ddd';
import { ArgumentInvalidException } from '@src/libs/exception';
import { z } from 'zod';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface EmailProps {
  email: string;
}

// Define a Zod schema for email
const emailSchema = z.object({
  email: z.string().email(),
});

export class Email extends ValueObject<EmailProps> {
  getEmail(): string {
    return this.props.email;
  }

  public isValidEmail(email: string) {
    // check for email format, validation, etc..
    // Validate the email using Zod
    try {
      emailSchema.parse({
        email,
      }); // This will throw an error if validation fails
    } catch (error) {
      // Handle or rethrow the validation error
      throw new ArgumentInvalidException('Email is invalid');
    }
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: EmailProps): void {
    this.isValidEmail(props.email);
  }
}
