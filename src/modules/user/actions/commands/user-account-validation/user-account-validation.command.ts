import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class UserAccountValidationCommand extends Command {
  readonly userId: string;

  constructor(props: CommandProps<UserAccountValidationCommand>) {
    super(props);
    this.userId = props.userId;
  }
}
