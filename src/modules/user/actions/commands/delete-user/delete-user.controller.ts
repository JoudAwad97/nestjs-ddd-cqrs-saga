import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';

@Controller('user')
export class DeleteUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand({ id });

    await this.commandBus.execute(command);

    return;
  }
}
