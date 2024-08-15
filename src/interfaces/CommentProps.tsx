import { ReplyProps } from "./ReplyProps";

export interface CommentProps{
    text: string;
    numOfLikes: number;
    user: string;
    replies?: ReplyProps[];
}