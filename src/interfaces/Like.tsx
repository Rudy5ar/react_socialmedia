import { User } from "./User";

export interface Like {
    id: number;
    user: User; // The user who liked the post
  }
  