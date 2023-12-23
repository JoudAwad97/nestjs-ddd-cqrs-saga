import { z } from 'zod';
import {
  COMMENT_CONTENT_MAX_LENGTH,
  COMMENT_CONTENT_MIN_LENGTH,
} from '../../../constants/comment.constants';

export const commentSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  content: z
    .string()
    .min(COMMENT_CONTENT_MIN_LENGTH)
    .max(COMMENT_CONTENT_MAX_LENGTH),
  author_id: z.string().uuid(),
  post_id: z.string().uuid(),
});

// comment Schema model in the database
export type CommentModel = z.TypeOf<typeof commentSchema>;
