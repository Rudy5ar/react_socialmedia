import React from 'react';
import { CommentProps } from "../../interfaces/CommentProps";
import "../../css/CommentForm.css";

interface CommentFormProps {
    comments?: CommentProps[];
}

export const CommentForm: React.FC<CommentFormProps> = ({ comments }) => {
    return (
        <div className="comment-form">
            {comments && comments.length > 0 ? (
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index} className="comment-card">
                            <div className="comment-user">Comment by: {comment.user}</div>
                            <div className="comment-text">{comment.text}</div>
                            <div className="comment-likes">Comment likes: {comment.numOfLikes}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-comments">No comments available</p>
            )}
        </div>
    );
};
