import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class CreateReportCommand extends Command {
  readonly authorId: string;
  readonly postId: string;

  constructor(props: CommandProps<CreateReportCommand>) {
    super(props);
    this.postId = props.postId;
    this.authorId = props.authorId;
  }
}
