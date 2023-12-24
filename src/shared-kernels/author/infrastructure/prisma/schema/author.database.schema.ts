import { z } from 'zod';
import {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NICK_NAME_MAX_LENGTH,
  NICK_NAME_MIN_LENGTH,
} from '../../../constants/author.constants';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const authorDatabaseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  first_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(FIRST_NAME_MAX_LENGTH),
  last_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(LAST_NAME_MAX_LENGTH),
  nick_name: z
    .string()
    .min(NICK_NAME_MIN_LENGTH)
    .max(NICK_NAME_MAX_LENGTH)
    .nullable()
    .optional(),
  user_id: z.string().uuid(),
  version: z.number(),
});

// author Schema model in the database
export type AuthorDatabaseModel = z.TypeOf<typeof authorDatabaseSchema>;
