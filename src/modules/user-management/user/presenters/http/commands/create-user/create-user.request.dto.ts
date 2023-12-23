import {
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NICK_NAME_MAX_LENGTH,
  NICK_NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@src/modules/user-management/user/constants/user.constants';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @MaxLength(EMAIL_MAX_LENGTH)
  @IsEmail()
  readonly email: string;

  @MaxLength(FIRST_NAME_MAX_LENGTH)
  @IsString()
  readonly firstName: string;

  @MaxLength(LAST_NAME_MAX_LENGTH)
  @IsString()
  readonly lastName: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
  @IsString()
  readonly password: string;

  @MaxLength(NICK_NAME_MAX_LENGTH)
  @MinLength(NICK_NAME_MIN_LENGTH)
  @IsString()
  @IsOptional()
  readonly nickName?: string;
}
