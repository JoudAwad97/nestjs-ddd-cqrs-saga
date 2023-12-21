import { Logger, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './infrastructure/database-providers/prisma/prisma';
import { UserModule } from './modules/user-management/user/user.module';
import { PostModule } from './modules/content-management/post/post.module';
import { CommentModule } from './modules/interactions/comment/comment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { DynamoDBService } from './infrastructure/database-providers/dynamodb/dynamodb';
import { AuthorModule } from './shared-kernels/author/author.module';
import { NotificationModule } from './modules/notification/notification.module';

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
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [...interceptors, ...services],
})
export class AppModule {}
