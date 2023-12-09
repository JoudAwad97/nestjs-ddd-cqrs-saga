import { IsUUID, MaxLength, MinLength } from 'class-validator';
import {
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '../../../constants/post.constants';

export class CreatePostRequestDto {
  @MaxLength(TITLE_MAX_LENGTH)
  @MinLength(TITLE_MIN_LENGTH)
  readonly title: string;

  @MaxLength(CONTENT_MAX_LENGTH)
  @MinLength(CONTENT_MIN_LENGTH)
  readonly content: string;

  @IsUUID()
  readonly authorId: string;
}
