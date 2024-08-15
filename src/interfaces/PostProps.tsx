import { CommentProps } from './CommentProps';

export interface PostProps {
  id: number;
  totalLikes: number;
  description?: string;
  dateCreated?: string;
  image: string; 
  username: string;
  comments?: CommentProps[];
  isLiked: boolean;
}
