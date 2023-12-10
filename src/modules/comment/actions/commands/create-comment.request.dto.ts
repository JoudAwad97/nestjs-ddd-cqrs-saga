import { IsUUID, MaxLength, MinLength } from 'class-validator';
import {
  COMMENT_CONTENT_MAX_LENGTH,
  COMMENT_CONTENT_MIN_LENGTH,
} from '../../constants/comment.constants';

export class CreateCommentRequestDto {
  @MaxLength(COMMENT_CONTENT_MAX_LENGTH)
  @MinLength(COMMENT_CONTENT_MIN_LENGTH)
  readonly content: string;

  @IsUUID()
  readonly authorId: string;

  @IsUUID()
  readonly postId: string;
}
