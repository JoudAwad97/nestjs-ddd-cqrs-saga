import { PostStatus } from '@prisma/client';
import { z } from 'zod';
import {
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '../../../constants/post.constants';

export const postSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  title: z.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH),
  content: z.string().min(CONTENT_MIN_LENGTH).max(CONTENT_MAX_LENGTH),
  status: z.nativeEnum(PostStatus),
  author_id: z.string().uuid(),
});

// post Schema model in the database
export type PostModel = z.TypeOf<typeof postSchema>;
