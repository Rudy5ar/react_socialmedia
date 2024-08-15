import { ReplyProps } from "./ReplyProps";

export interface CommentProps {
    id: number;
    text: string;
    numOfLikes: number;
    username: string;
    replies?: ReplyProps[];
}