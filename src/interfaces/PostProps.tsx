export interface PostProps {
  totalLikes: number;
  description?: string;
  dateCreated?: string;
  image?: string; 
  user?: string;
  comments?: { text: string }[];
  likes?: { user: { username: string } }[];
}
