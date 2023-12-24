import { IsUUID } from 'class-validator';

export class CreateLikeDto {
  @IsUUID()
  readonly authorId: string;

  @IsUUID()
  readonly postId: string;
}
