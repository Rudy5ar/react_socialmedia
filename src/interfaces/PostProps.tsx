// src/interfaces/PostProps.ts
export interface PostProps {
  totalLikes: number;
  description?: string;
  dateCreated?: string;
  image?: string;  // base64 encoded image
  user?: {
    username: string;
  };
  comments?: { text: string }[];
  likes?: { user: { username: string } }[];
}
