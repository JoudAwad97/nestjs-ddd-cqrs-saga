import { IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  authorId: string;

  @IsUUID()
  postId: string;
}
