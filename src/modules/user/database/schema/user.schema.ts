import { UserRole, UserStatus } from '@prisma/client';
import { z } from 'zod';
import {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NICK_NAME_MAX_LENGTH,
  NICK_NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../../constants/user.constants';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const userSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
  first_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(FIRST_NAME_MAX_LENGTH),
  last_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(LAST_NAME_MAX_LENGTH),
  nick_name: z
    .string()
    .min(NICK_NAME_MIN_LENGTH)
    .max(NICK_NAME_MAX_LENGTH)
    .optional(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  //   you can add optional fields in case you want to return them
  //   posts: z.array(PostSchema).optional(),
  //   comments: z.array(CommentSchema).optional(),
});

// user Schema model in the database
export type UserModel = z.TypeOf<typeof userSchema>;
