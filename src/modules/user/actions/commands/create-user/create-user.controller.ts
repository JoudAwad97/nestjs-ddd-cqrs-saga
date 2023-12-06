import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IdResponse } from '@src/libs/api/response/id.response.dto';
import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserCommand } from './create-user.command';
import { AggregateID } from '@src/libs/ddd';

@Controller('user')
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * in the world of CQRS we can either return an ID of the item or return nothing
   * if we do not return anything then the FE should be submitting the ID for the BE
   */
  @Post('/')
  async createUser(@Body() body: CreateUserRequestDto): Promise<IdResponse> {
    const command = new CreateUserCommand(body);

    /**
     * TODO: if we want to get some validation rules before we execute the command
     * we can call the query execution from another domain to return data to us
     */

    const result: AggregateID = await this.commandBus.execute(command);

    return new IdResponse(result);
  }
}
