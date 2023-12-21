// All properties that a author has
export interface AuthorProps {
  firstName: string;
  lastName: string;
  nickName: string;
  userId: string;
  version: number;
}

export interface UpdateAuthorProps {
  firstName: string;
  lastName: string;
  nickName?: string;
  version: number;
}

export interface CreateAuthorProps {
  firstName: string;
  lastName: string;
  nickName: string;
  userId: string;
}
