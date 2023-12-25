import { Module } from '@nestjs/common';
import { NotificationACLModule } from './anti-corruption-layer/acl.module';

@Module({
  imports: [NotificationACLModule],
  exports: [NotificationACLModule],
})
export class NotificationInfrastructureModule {}
