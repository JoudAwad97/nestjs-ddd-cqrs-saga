import { Module } from '@nestjs/common';
import { AuthorORMModule } from './prisma/author-orm.module';

@Module({
  imports: [AuthorORMModule],
  exports: [AuthorORMModule],
})
export class AuthorInfrastructureModule {}
