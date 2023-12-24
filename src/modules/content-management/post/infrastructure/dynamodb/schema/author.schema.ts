import { z } from 'zod';
import {
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NICK_NAME_MIN_LENGTH,
  NICK_NAME_MAX_LENGTH,
} from '@src/shared-kernels/author/constants/author.constants';

export const authorDynamoDBSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  first_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(FIRST_NAME_MAX_LENGTH),
  last_name: z.string().min(FIRST_NAME_MIN_LENGTH).max(LAST_NAME_MAX_LENGTH),
  nick_name: z
    .string()
    .min(NICK_NAME_MIN_LENGTH)
    .max(NICK_NAME_MAX_LENGTH)
    .nullable()
    .optional(),
  author_id: z.string().uuid(),
});

// author Schema model in the database
export type AuthorDynamoDBModel = z.TypeOf<typeof authorDynamoDBSchema>;
