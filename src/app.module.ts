import { Logger, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './infrastructure/database-providers/prisma/prisma';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_CONNECTION,
  RABBITMQ_INJECTION_NAME,
  RABBITMQ_QUEUE,
} from './constants';
import { DynamoDBService } from './infrastructure/database-providers/dynamodb/dynamodb';

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
    ClientsModule.register({
      clients: [
        {
          name: RABBITMQ_INJECTION_NAME,
          transport: Transport.RMQ,
          options: {
            urls: [RABBITMQ_CONNECTION],
            queue: RABBITMQ_QUEUE,
            queueOptions: { durable: false },
          },
        },
      ],
      isGlobal: true,
    }),
    // modules
    UserModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [...interceptors, ...services],
})
export class AppModule {}
