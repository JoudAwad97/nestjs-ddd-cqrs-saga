import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class CreateLikeCommand extends Command {
  readonly authorId: string;
  readonly postId: string;

  constructor(props: CommandProps<CreateLikeCommand>) {
    super(props);
    this.authorId = props.authorId;
    this.postId = props.postId;
  }
}
