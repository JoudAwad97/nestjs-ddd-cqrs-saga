import { Mapper } from '@src/libs/ddd';
import { ReportEntity } from '../../../domain/report.entity';
import {
  ReportDetailResponseDto,
  ReportResponseDto,
} from '../../../presenters/dto/report.dto';
import { ReportModel } from '../schema/report.schema';
import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';
import { PostModel } from '@src/modules/content-management/post/infrastructure/prisma/schema/post.schema';

export abstract class ReportMapperPort extends Mapper<
  ReportEntity,
  ReportModel,
  ReportResponseDto
> {
  abstract toDetailResponseDto(
    report: ReportModel,
    author: AuthorDatabaseModel,
    post: PostModel,
  ): ReportDetailResponseDto;
}
