import { Module } from '@nestjs/common';
import { UserPrismaModule } from './prisma/user-prisma.module';

@Module({
  imports: [UserPrismaModule],
  exports: [UserPrismaModule],
})
export class UserInfrastructureModule {}
