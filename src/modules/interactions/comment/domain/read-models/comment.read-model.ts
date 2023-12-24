/**
 * Read-Models are a Read-only interfaces that can be used in terms of queries
 * where we do not have to convert data from repository into domain entities
 * with that we can create a Read-Only interfaces that can be used for queries
 */
export interface CommentWithAuthorReadModel {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    createdAt: string;
    updatedAt: string;
  };
}
