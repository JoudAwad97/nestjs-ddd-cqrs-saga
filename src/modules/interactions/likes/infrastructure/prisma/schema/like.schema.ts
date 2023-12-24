import { z } from 'zod';

export const likeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  author_id: z.string().uuid(),
  post_id: z.string().uuid(),
});

export type LikeModel = z.TypeOf<typeof likeSchema>;
