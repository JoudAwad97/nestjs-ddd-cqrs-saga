import { PostStatus } from './value-objects/status.value-objects';

export interface PostProps {
  title: string;
  content: string;
  authorId: string;
  status: PostStatus;
}

export interface CreatePostProps {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePostProps {
  title: string;
  content: string;
}

export enum PostStatuses {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
