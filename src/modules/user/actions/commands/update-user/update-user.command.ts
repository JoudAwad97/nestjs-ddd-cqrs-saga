import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class UpdateUserCommand extends Command {
  readonly userId: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickName?: string;

  constructor(props: CommandProps<UpdateUserCommand>) {
    super(props);
    this.userId = props.userId;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.nickName = props.nickName;
  }
}
