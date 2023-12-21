import {
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NICK_NAME_MAX_LENGTH,
  NICK_NAME_MIN_LENGTH,
} from '@src/modules/user-management/user/constants/user.constants';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserRequestDto {
  @MaxLength(EMAIL_MAX_LENGTH)
  @IsEmail()
  readonly email: string;

  @MaxLength(FIRST_NAME_MAX_LENGTH)
  @IsString()
  readonly firstName: string;

  @MaxLength(LAST_NAME_MAX_LENGTH)
  @IsString()
  readonly lastName: string;

  @MaxLength(NICK_NAME_MAX_LENGTH)
  @MinLength(NICK_NAME_MIN_LENGTH)
  @IsString()
  @IsOptional()
  readonly nickName?: string;
}
