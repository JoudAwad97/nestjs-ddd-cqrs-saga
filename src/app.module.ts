import { Logger, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './infrastructure/database-providers/prisma/prisma';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [...interceptors, PrismaService, Logger],
})
export class AppModule {}
