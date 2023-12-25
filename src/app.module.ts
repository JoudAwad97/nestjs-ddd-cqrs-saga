import { Logger, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './shared/infrastructure/database-providers/prisma/prisma';
import { UserModule } from './modules/user-management/user/user.module';
import { PostModule } from './modules/content-management/post/post.module';
import { CommentModule } from './modules/interactions/comment/comment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { DynamoDBService } from './shared/infrastructure/database-providers/dynamodb/dynamodb';
import { AuthorModule } from './shared-kernels/author/author.module';
import { NotificationModule } from './modules/notification/notification.module';
import { GlobalGuardModule } from './shared/infrastructure/web/guards/guards.module';
import { LikeModule } from './modules/interactions/likes/likes.module';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { ReportModule } from './modules/interactions/report/report.module';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

const services: Provider[] = [PrismaService, Logger, DynamoDBService];

const libraries: Provider[] = [];

@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    // modules
    UserModule,
    PostModule,
    CommentModule,
    AuthorModule,
    LikeModule,
    NotificationModule,
    GlobalGuardModule,
    LoggerModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [...interceptors, ...services, ...libraries],
})
export class AppModule {}
