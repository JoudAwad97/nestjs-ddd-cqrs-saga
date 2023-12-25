import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostRepositoryPort } from '@src/modules/content-management/post/infrastructure/prisma/repository/post.repository.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { LoggerPort } from '@src/libs/ports/logger.port';
import { USER_FETCH_MESSAGE_PATTERN } from '@src/shared/constants/user-events.constants';
import { UserListenerResponseDto } from '@src/shared/application/dto/user.listener.dto';
import { UserStatuses } from '@src/modules/user-management/user/domain/user.types';
import { PostErrors } from '@src/modules/content-management/post/domain/post.errors';
import { PostEntity } from '@src/modules/content-management/post/domain/post.entity';
import { AggregateID } from '@src/libs/ddd';

@CommandHandler(CreatePostCommand)
export class CreatePostApplicationService
  implements ICommandHandler<CreatePostCommand>
{
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly eventPublisher: EventPublisher,
    private readonly logger: LoggerPort,
  ) {}

  async execute(command: CreatePostCommand): Promise<AggregateID> {
    const { authorId, content, title } = command;
    // fetch the user information from the user module
    /**
     * MODULAR MONOLITH COMMUNICATION
     * METHOD 1: Use RPC like communication
     * this will allow us to communicate between two modules by sending an event and waiting for response
     * this is one of the ways we gonna implement communication between two modules
     * this is a good approach as it allow us to decouple the modules and only relay on the event
     * - https://medium.com/@miladev95/message-broker-and-rpc-c0b1906738b1
     * - https://medium.com/swlh/scalable-microservice-architecture-using-rabbitmq-rpc-d07fa8faac32
     */
    const user =
      await this.eventPublisher.sendAndReceiveMessage<UserListenerResponseDto>(
        USER_FETCH_MESSAGE_PATTERN,
        {
          id: authorId,
        },
      );

    // check the status
    if (!user || user.status === UserStatuses.INACTIVE) {
      PostErrors.UserNotAllowedToPublishAPost();
    }

    // continue the process and create a new post entity
    const post = PostEntity.create({
      authorId,
      content,
      title,
    });

    const result = await this.postRepository.create(post);

    post.publishEvents(this.eventPublisher, this.logger);

    return result.id;
  }
}
