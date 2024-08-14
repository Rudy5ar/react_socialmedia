import { CommentProps } from './CommentProps';

export interface PostProps {
  totalLikes: number;
  description?: string;
  dateCreated?: string;
  image: string; 
  user?: string;
  comments?: CommentProps[];
  likes?: { user: { username: string } }[];
}
