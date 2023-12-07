import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class DeleteUserCommand extends Command {
  readonly id: string;

  constructor(props: CommandProps<DeleteUserCommand>) {
    super(props);
    this.id = props.id;
  }
}
