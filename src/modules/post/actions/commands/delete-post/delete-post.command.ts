import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class DeletePostCommand extends Command {
  readonly postId: string;

  constructor(props: CommandProps<DeletePostCommand>) {
    super(props);
    this.postId = props.postId;
  }
}
