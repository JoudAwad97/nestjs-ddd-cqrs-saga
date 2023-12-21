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
    /**
     * we use a command in here and we do not pass the DTO as it is because we want to have
     * a kind of separation of concerns between "Application Services" and the "Controller Input"
     * Application Services should only knows about a "Command OR Query" and should return a DTO to the controller layer
     */
    const command = new CreateUserCommand(body);

    const result: AggregateID = await this.commandBus.execute(command);

    return new IdResponse(result);
  }
}
