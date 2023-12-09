import { Command } from '@src/libs/ddd/command.base';

export class CreatePostCommand extends Command {
  readonly title: string;
  readonly content: string;
  readonly authorId: string;

  constructor(props) {
    super(props);
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}
