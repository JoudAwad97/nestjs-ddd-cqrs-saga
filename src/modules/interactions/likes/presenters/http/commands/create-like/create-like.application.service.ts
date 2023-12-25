import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLikeCommand } from './create-like.command';
import { AggregateID } from '@src/libs/ddd';
import { PostRepositoryPort } from '@src/modules/content-management/post/infrastructure/prisma/repository/post.repository.port';
import { LikeService } from '@src/modules/interactions/likes/domain/like.service';
import { LikeErrors } from '@src/modules/interactions/likes/domain/like.errors';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';
import { LikesRepositoryPort } from '@src/modules/interactions/likes/infrastructure/prisma/repository/like.repository.port';
import { AuthorRepositoryPort } from '@src/shared-kernels/author/infrastructure/prisma/repository/author.repository.port';

@CommandHandler(CreateLikeCommand)
export class CreateLikeApplicationService
  implements ICommandHandler<CreateLikeCommand, AggregateID>
{
  constructor(
    private readonly authorRepository: AuthorRepositoryPort,
    private readonly postRepository: PostRepositoryPort,
    private readonly likeRepository: LikesRepositoryPort,
    private readonly likeService: LikeService,
  ) {}

  async execute(command: CreateLikeCommand): Promise<AggregateID> {
    const { authorId, postId } = command;

    const [author, post] = await Promise.all([
      this.authorRepository.findAuthorByUserId(authorId),
      this.postRepository.findById(postId),
    ]);

    const canLikeBeCreated = this.likeService.canCreateLike(author, post);

    if (!canLikeBeCreated) {
      LikeErrors.InvalidLike();
    }

    const like = LikeEntity.create({
      authorId,
      postId,
    });

    const res = await this.likeRepository.create(like);

    // do not forget to publish events (domain events)

    return res.id;
  }
}
