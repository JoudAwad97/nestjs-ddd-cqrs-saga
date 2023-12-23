import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class SendWelcomeEmailCommand extends Command {
  readonly userId: string;

  constructor(props: CommandProps<SendWelcomeEmailCommand>) {
    super(props);
    this.userId = props.userId;
  }
}
