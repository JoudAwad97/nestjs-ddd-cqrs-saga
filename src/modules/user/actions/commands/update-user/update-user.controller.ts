import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserRequestDto } from './update-user.request.dto';

@Controller('user')
export class UpdateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('/:id')
  async updateUser(
    @Body() body: UpdateUserRequestDto,
    @Param('id') id: string,
  ): Promise<void> {
    const command = new UpdateUserCommand({
      ...body,
      userId: id,
    });

    await this.commandBus.execute(command);
  }
}
