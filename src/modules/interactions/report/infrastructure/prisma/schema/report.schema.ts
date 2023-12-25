import { z } from 'zod';

export const reportSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  author_id: z.string().uuid(),
  post_id: z.string().uuid(),
});

// report Schema model in the database
export type ReportModel = z.TypeOf<typeof reportSchema>;
