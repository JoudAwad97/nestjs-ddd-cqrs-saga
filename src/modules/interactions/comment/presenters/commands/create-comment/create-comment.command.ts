import { Command, CommandProps } from '@src/libs/ddd/command.base';

export class CreateCommentCommand extends Command {
  readonly content: string;
  readonly authorId: string;
  readonly postId: string;

  constructor(props: CommandProps<CreateCommentCommand>) {
    super(props);
    this.authorId = props.authorId;
    this.content = props.content;
    this.postId = props.postId;
  }
}
