import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickName?: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.password = props.password;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.nickName = props.nickName;
  }
}
