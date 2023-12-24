import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class NotifySupervisorCommand extends Command {
  readonly userId: string;

  constructor(props: CommandProps<NotifySupervisorCommand>) {
    super(props);
    this.userId = props.userId;
  }
}
