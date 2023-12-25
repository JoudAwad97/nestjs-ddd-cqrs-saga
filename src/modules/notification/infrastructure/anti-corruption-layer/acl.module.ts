import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorServicePort } from './translator.service.port';
import { NotificationUserRepositoryContract } from '../../application/contracts/user.repository.contract';
import { UserOrmModule } from '@src/modules/user-management/user/infrastructure/prisma/user-orm.module';
import { UserNotificationAdaptor } from './user/adaptar';

@Module({
  imports: [UserOrmModule.useContracts([NotificationUserRepositoryContract])],
  providers: [
    {
      provide: TranslatorServicePort,
      useClass: TranslatorService,
    },
    UserNotificationAdaptor,
  ],
  exports: [TranslatorServicePort],
})
export class NotificationACLModule {}
