import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';

@Controller('post')
export class DeletePostHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete('/:id')
  async createPost(@Param('id') id: string): Promise<void> {
    const command = new DeletePostCommand({
      postId: id,
    });

    await this.commandBus.execute(command);
  }
}
