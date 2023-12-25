import { Module } from '@nestjs/common';
import { UserOrmModule } from './prisma/user-orm.module';

@Module({
  imports: [UserOrmModule],
  exports: [UserOrmModule],
})
export class UserInfrastructureModule {}
