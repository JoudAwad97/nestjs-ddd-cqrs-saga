import { Injectable } from '@nestjs/common';
import { ReportMapperPort } from './report.mapper.port';
import { ReportEntity } from '../../../domain/report.entity';
import {
  ReportDetailResponseDto,
  ReportResponseDto,
} from '../../../presenters/dto/report.dto';
import { ReportModel } from '../schema/report.schema';
import { AuthorDatabaseModel } from '@src/shared-kernels/author/infrastructure/prisma/schema/author.database.schema';
import { PostModel } from '@src/modules/content-management/post/infrastructure/prisma/schema/post.schema';

@Injectable()
export class ReportMapper implements ReportMapperPort {
  toDetailResponseDto(
    report: ReportModel,
    author: AuthorDatabaseModel,
    post: PostModel,
  ): ReportDetailResponseDto {
    const response = new ReportDetailResponseDto({
      id: report.id,
      createdAt: report.created_at,
      updatedAt: report.updated_at,
    });

    response.author = {
      id: author.id,
      firstName: author.first_name,
      lastName: author.last_name,
      nickName: author.nick_name,
      createdAt: author.created_at.toDateString(),
      updatedAt: author.updated_at.toDateString(),
    };

    response.post = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.created_at.toDateString(),
      updatedAt: post.updated_at.toDateString(),
    };

    return response;
  }

  toPersistence(entity: ReportEntity): ReportModel {
    const res: ReportModel = {
      id: entity.getProps().id,
      author_id: entity.getProps().authorId,
      post_id: entity.getProps().postId,
      created_at: entity.getProps().createdAt,
      updated_at: entity.getProps().updatedAt,
    };
    return res;
  }

  toDomain(record: ReportModel): ReportEntity {
    return new ReportEntity({
      id: record.id,
      props: {
        authorId: record.author_id,
        postId: record.post_id,
      },
      createdAt: record.created_at,
      updatedAt: record.updated_at,
    });
  }

  toResponse(entity: ReportEntity): ReportResponseDto {
    const response = new ReportResponseDto(entity);
    response.authorId = entity.getProps().authorId;
    response.postId = entity.getProps().postId;
    return response;
  }
}
