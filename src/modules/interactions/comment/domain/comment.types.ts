export interface CommentProps {
  postId: string;
  content: string;
  /**
   * Would like this to be converted into a "value-object"
   * where we can only store the required information for the comment author
   */
  authorId: string;
}

export interface CreateCommentProps {
  postId: string;
  content: string;
  authorId: string;
}
