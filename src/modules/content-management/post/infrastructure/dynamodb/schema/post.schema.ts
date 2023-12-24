import { PostStatus } from '@prisma/client';
import { z } from 'zod';
import {
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '../../../constants/post.constants';

export const postDynamoDBSchema = z.object({
  pk: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH),
  content: z.string().min(CONTENT_MIN_LENGTH).max(CONTENT_MAX_LENGTH),
  status: z.nativeEnum(PostStatus),
  author_id: z.string().uuid(),
});

// post Schema model in the database
export type PostDynamoDBModel = z.TypeOf<typeof postDynamoDBSchema>;
