import { CommentProps } from './CommentProps';

export interface PostProps {
  id: number;
  totalLikes: number;
  description?: string;
  dateCreated?: string;
  image: string; 
  user?: string;
  comments?: CommentProps[];
  likes?: { user: { username: string } }[];
}
